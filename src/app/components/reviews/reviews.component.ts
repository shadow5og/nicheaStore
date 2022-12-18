import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Review from 'src/app/models/review-model';
import { ProductInfo } from 'src/app/models/searchResponse-model';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit, OnChanges {
  @Input() reviews: Review[];
  @Input() product: ProductInfo;
  rating: number;
  displayedReviews: Review[];

  constructor() {}

  filterReviews():void{
    this.displayedReviews = this.reviews.filter(
      (review) => review.productID === this.product.id
    );
  }

  ngOnInit(): void {
    this.filterReviews();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filterReviews();
  }
}

