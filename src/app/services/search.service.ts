import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import SearchResult, { ProductInfo } from 'src/app/models/searchResponse-model';
import { CategoriesService } from './categories-service.service';

interface ApiLinks {
  search: string;
  allProducts: {
    prefix: string;
    suffix: string;
  };
  category: {
    prefix: string;
    suffix: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchResults: SearchResult | undefined;
  productImage: string = 'https://www.nichea.co.za/nichea/file/';
  private productsSearchSubject: Subject<SearchResult | null> =
    new Subject<SearchResult | null>();
  link: ApiLinks = {
    search: 'https://www.nichea.co.za/nichea/products/1/30/ASC/name?keyword=',
    allProducts: {
      prefix: 'https://www.nichea.co.za/nichea/products/',
      suffix: '/12/ASC/name?keyword=',
    },
    category: {
      prefix: 'https://www.nichea.co.za/nichea/products/',
      suffix: '/12/ASC/name/',
    },
  };
  
  constructor(
    private http: HttpClient,
    private categoryService: CategoriesService
  ) {}

  resolveLink(prefix: string, suffix: string, pageNumber: number): string {
    return `${prefix}${pageNumber}${suffix}`;
  }

  onProductSearch(): Observable<SearchResult> {
    return this.productsSearchSubject.asObservable();
  }

  productSearch(
    searchString?: string,
    isCategory?: boolean,
    page?: number
  ): void {
    let finalUrl;

    if (searchString && isCategory) {
      !page ? (page = 1) : '';

      finalUrl =
        this.resolveLink(
          this.link.category.prefix,
          this.link.category.suffix,
          page
        ) + encodeURI(searchString);
    } else if (searchString) {
      finalUrl = this.link.search + encodeURI(searchString);
    } else {
      !page ? (page = 1) : '';

      finalUrl = this.resolveLink(
        this.link.allProducts.prefix,
        this.link.allProducts.suffix,
        page
      );
    }

    console.log(finalUrl);

    const httpResponse: Observable<SearchResult> =
      this.http.get<SearchResult>(finalUrl);

    httpResponse.subscribe((result: SearchResult) => {
      result.content = this.categoryService.cleanDescriptions(
        result.content
      ) as ProductInfo[];

      this.searchResults = result;
      this.productsSearchSubject.next(this.searchResults);
    });
  }
}
