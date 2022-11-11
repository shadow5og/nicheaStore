import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SearchResult from 'src/app/models/searchResponse-model';
import { SearchService } from 'src/app/services/search.service';
import Category from 'src/app/models/category-model';
import { CategoriesService } from 'src/app/services/categories-service.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  productsData: SearchResult;
  category: string;
  isCategory: boolean = true;
  productCategories:Category[];
  categoryStick:boolean;
  currentPage:number;

  constructor(
    private router: ActivatedRoute,
    private productsRepository: SearchService,
    private categoryService: CategoriesService
  ) {
    this.productsRepository
      .onProductSearch()
      .subscribe((results: SearchResult) => {
        this.productsData = results;
      });
      this.category = this.router.snapshot.paramMap.get('category');
      this.currentPage = parseInt(this.router.snapshot.paramMap.get('page'));

    this.categoryService.getCategories().subscribe((categories:Category[]) => {
      categories = categoryService.cleanDescriptions(categories);
      this.productCategories = categories;
    });
  }
  
  ngOnInit(): void {
    if (this.category) {
      this.productsRepository.productSearch(this.category, this.isCategory, this.currentPage);
    } else {
      this.productsRepository.productSearch();
    }
  }
}
