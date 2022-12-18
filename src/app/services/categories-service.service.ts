import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscriber } from 'rxjs';
import Category from '../models/category-model';
import SearchResult, { ProductInfo } from '../models/searchResponse-model';
import { removeHTML, capitalizeNewSentence } from '../utils/utils';

interface ApiLinks {
  categories: string;
  allProducts: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl: ApiLinks = {
    categories: 'https://www.nichea.co.za/nichea/categories/all',
    allProducts: 'https://www.nichea.co.za/nichea/products/1/900000/ASC/name/',
  };
  private categories: Category[];
  private subject: Subject<Category[] | SearchResult> = new Subject();

  constructor(private http: HttpClient) {}

  // Remove HTML tags, add full stops and capitalize where needed.
  cleanDescriptions(data: any): Category[] | ProductInfo[] {
    const newData = [...data];
    for (const item of newData) {
      item.description = removeHTML(item.description);
      item.description = capitalizeNewSentence(item.description);

      if (item?.category) {
        item.category.description = removeHTML(item.category.description);
        item.category.description = capitalizeNewSentence(
          item.category.description
        );
      }
    }

    return newData;
  }

  onGetCategories():Observable<Category[] | SearchResult>{
    return this.subject.asObservable();
  }

  getCategories(categoryName?: string): void {
    let link: string;

    if (!!categoryName) {
      link = this.apiUrl.allProducts + encodeURI(categoryName);
    } else {
      link = this.apiUrl.categories;
    }

    this.http.get<Category[] | SearchResult>(link).subscribe((data) => {
      let result = data as any;
      if (result?.content) {
        result = result as SearchResult;
        result.content = this.cleanDescriptions(
          result.content
        ) as ProductInfo[];
      } else {
        result = this.cleanDescriptions(result) as Category[];
      }

      this.subject.next(result);
    });
  }
}
