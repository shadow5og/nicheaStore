import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories-service.service';
import Category from 'src/app/models/category-model';
import { Subscription } from 'rxjs';
import resolveLink, { resolveImageLink } from 'src/app/utils/utils';
import SearchResult from 'src/app/models/searchResponse-model';

@Component({
  selector: 'app-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css'],
})
export class CategoriesShowCase implements OnInit {
  categories: Category[] = [];
  subscription: Subscription;

  constructor(private categoriesService: CategoriesService) {
    categoriesService.getCategories();
  }

  resolveLink(category: string): string {
    return resolveLink(null, category);
  }

  resolveImageLink(id:string, name:string):string{
    return resolveImageLink(id, name);
  }

  ngOnInit(): void {
    this.subscription = this.categoriesService
      .onGetCategories()
      .subscribe(
        (categories: Category[] | SearchResult) =>
          (this.categories = categories as Category[])
      );
  }
}
