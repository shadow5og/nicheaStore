import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import Review from 'src/app/models/review-model';
import SearchResult, {
  PriceInformation,
  ProductInfo,
} from 'src/app/models/searchResponse-model';
import { CategoriesService } from 'src/app/services/categories-service.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { SearchService } from 'src/app/services/search.service';
import resolveLink, {
  resolveImageLink,
  getLowestPrice,
} from 'src/app/utils/utils';

// type ProductSet = ProductInfo[];

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private productName: string;
  private _products: ProductInfo[];
  private _product: ProductInfo;
  cardSet: ProductInfo[][];
  private _price: string = '0.00';
  private _quantity: number;
  currentRate = 4;
  amount: string;
  active: number = 1;
  reviews: Review[] = [];

  constructor(
    private productService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoriesService,
    config: NgbNavConfig,
    private reviewsService: ReviewsService
  ) {
    config.destroyOnHide = false;
  }

  get product() {
    return this._product;
  }

  set product(newProduct: ProductInfo) {
    this._products.push(this._product);
    this._product = this._products.find(
      (product) => product.name === newProduct.name
    );
    this._products = this._products.filter(
      (product) => product !== this._product
    );
    this.prepCards(this._products);
  }

  get products(): ProductInfo[] {
    return this._products;
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
    this.amount = this.setAmount();
  }

  set price(price: string) {
    this._price = price;
    this.amount = this.setAmount();
  }

  get price() {
    return this._price;
  }

  setAmount(): string {
    console.log(typeof this._quantity);
    return this._quantity >= 0
      ? String((this._quantity * parseFloat(this._price)).toFixed(2))
      : '0.00';
  }

  productSearch(name: string): void {
    this.productService.search(name, false, null, true);
  }

  resolveImageLink(id: string, name: string): string {
    return resolveImageLink(id, name);
  }

  resolveLink(product: string): string {
    return resolveLink(null, null, product);
  }

  prepCards(products: ProductInfo[]): void {
    this.cardSet = [];
    let set: ProductInfo[] = [],
      i = 0;

    while (i < products.length) {
      set = [];
      for (let j = 0; j < 3; j++) {
        if (i < products.length) {
          set.push(products[i]);
          i++;
        }
      }
      this.cardSet.push(set);
    }
  }

  getLowestPrice(prices: PriceInformation[]): number {
    return getLowestPrice(prices);
  }

  reloadPage(product: string): void {
    this.productSearch(product);
  }

  relatedProduct(): void {}

  ngOnInit(): void {
    this.productName = this.route.snapshot.paramMap.get('name');
    this.productSearch(this.productName);

    this.subscription = this.productService
      .onSearch()
      .subscribe((data: SearchResult | ProductInfo) => {
        let result = { ...data } as any;
        if (result?.category) {
          this._product = result as ProductInfo;

          this.categoryService.getCategories(this._product.category.name);
        }
      });

    this.subscription.add(
      this.categoryService.onGetCategories().subscribe((data) => {
        const result = data as SearchResult;
        this._products = result.content.filter(
          (product) => product.name !== this.productName
        ) as ProductInfo[];
        this.prepCards(this._products);
      })
    );

    this.subscription.add(
      this.route.paramMap.subscribe((parameters) =>
        this.reloadPage(parameters.get('name'))
      )
    );

    this.subscription.add(
      this.reviewsService
        .getReviews()
        .subscribe((reviews) => {
          this.reviews = [...reviews];
          console.log(this.reviews);
        })
    );

    this.reviewsService.getReviews();
  }

  onSubmit(): void {
    console.log('submitted');
    // add to cart
  }

  updateReviews($event: Review): void {
    this.reviewsService.setReviews($event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
