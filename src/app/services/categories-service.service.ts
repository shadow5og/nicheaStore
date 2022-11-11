import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscriber } from 'rxjs';
import Category from '../models/category-model';
import { ProductInfo } from '../models/searchResponse-model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl: string = 'https://www.nichea.co.za/nichea/categories/all';
  private categories: Category[];

  constructor(private http: HttpClient) {}

  cleanDescriptions(data: any): Category[] | ProductInfo[] {
    const newData = [...data];
    for (const item of newData) {
      item.description = item.description.replace(/(<.{1,50}>)|(&.{0,20};)|(\\n)/gi, '');

      if (item?.category) {
        item.category.description = item.category.description.replace(/(<.{1,50}>)|(&.{0,20};)|(\\n)/gi, '');
      }
    }
    
    return newData;
  }

  getCategories(): Observable<Category[]> {
    console.log(this.apiUrl);
    return this.http.get<Category[]>(this.apiUrl);
  }
}
