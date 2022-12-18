import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SearchResult, { ProductInfo } from 'src/app/models/searchResponse-model';
import { SearchService } from 'src/app/services/search.service';
import Category from 'src/app/models/category-model';
import { CategoriesService } from 'src/app/services/categories-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  productsData: SearchResult;
  category: string;
  isCategory: boolean = true;
  productCategories: Category[];
  categoryStick: boolean;
  currentPage: number;
  subscription: Subscription;

  constructor(
    private router: ActivatedRoute,
    private productsRepository: SearchService,
    private categoryService: CategoriesService
  ) {
    categoryService.getCategories();
  }

  ngOnInit(): void {
    if (this.category) {
      this.productsRepository.search(
        this.category,
        this.isCategory,
        this.currentPage
      );
    } else {
      this.productsRepository.search();
    }

    this.subscription = this.productsRepository
      .onSearch()
      .subscribe(
        (data: SearchResult | ProductInfo) =>
          (this.productsData = data as SearchResult)
      );

    this.subscription.add(
      this.categoryService
        .onGetCategories()
        .subscribe((categories: Category[] | SearchResult) => {
          this.productCategories = categories as Category[];
        })
    );

    this.category = this.router.snapshot.paramMap.get('category');
    this.currentPage = parseInt(this.router.snapshot.paramMap.get('page'));
  }
}
