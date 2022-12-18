import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import SearchResult, { ProductInfo } from 'src/app/models/searchResponse-model';
import { CategoriesService } from './categories-service.service';
import { removeHTML, capitalizeNewSentence } from '../utils/utils';

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
  product: string;
}

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchResults: SearchResult | ProductInfo;
  productImage: string = 'https://www.nichea.co.za/nichea/file/';
  private productsSearchSubject: Subject<SearchResult | ProductInfo> =
    new Subject();
  products: SearchResult | ProductInfo;

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
    product: 'https://www.nichea.co.za/nichea/products/name/',
  };

  constructor(
    private http: HttpClient,
    private categoryService: CategoriesService
  ) {}

  resolveLink(prefix: string, suffix: string, pageNumber: number): string {
    return `${prefix}${pageNumber}${suffix}`;
  }

  onSearch(): Observable<SearchResult | ProductInfo> {
    return this.productsSearchSubject.asObservable();
  }

  search(
    searchString?: string,
    isCategory?: boolean,
    page?: number,
    isProduct?: boolean,
  ): void {
    let finalUrl: string;
    if (searchString && isCategory) {
      !page ? (page = 1) : '';
      finalUrl =
        this.resolveLink(
          this.link.category.prefix,
          this.link.category.suffix,
          page
        ) + encodeURI(searchString);
    } else if (searchString && isProduct) {
      finalUrl = this.link.product + encodeURI(searchString);
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

    const httpResponse: Observable<SearchResult | ProductInfo> = this.http.get<
      SearchResult | ProductInfo
    >(finalUrl);

    httpResponse.subscribe((data: SearchResult | ProductInfo) => {
      let result = data as any;
      if (result?.content) {
        result.content = this.categoryService.cleanDescriptions(
          result.content
        ) as ProductInfo[];

        this.products = result as SearchResult;
      } else {
        result.description = removeHTML(result.description);
        result.description = capitalizeNewSentence(result.description);

        this.products = result as ProductInfo;
      }

      this.productsSearchSubject.next(this.products);
    });
  }
}
