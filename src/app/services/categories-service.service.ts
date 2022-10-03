import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Category } from '../models/category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesServiceService {
  private apiUrl: string = 'https://www.nichea.co.za/nichea/categories/all';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    console.log(this.apiUrl);
    return this.http.get<Category[]>(this.apiUrl);
  }
}
