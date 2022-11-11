import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories-service.service';
import Category from 'src/app/models/category-model';

@Component({
  selector: 'app-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css'],
})
export class ProductCategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .subscribe(
        (categories: Category[]) =>
          (this.categories =
            this.categoriesService.cleanDescriptions(categories))
      );
  }
}
