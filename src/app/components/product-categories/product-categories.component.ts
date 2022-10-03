import { Component, OnInit } from '@angular/core';
import { CategoriesServiceService } from 'src/app/services/categories-service.service';
import { Category } from 'src/app/models/category-model';

@Component({
  selector: 'app-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.css'],
})
export class ProductCategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoriesService: CategoriesServiceService) {}

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .subscribe((categories: Category[]) =>
        this.cleanCategoryDescriptions(categories)
      );
  }

  cleanCategoryDescriptions(categories: Category[]): void {
    for (const category of categories) {
      category.description = category.description.replace(/(<..?>)(\n)?/gi, '');
      category.name = category.name.toLocaleLowerCase();
    }

    this.categories = categories;
  }
}
