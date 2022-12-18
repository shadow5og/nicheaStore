import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import Review, { Reviews } from '../models/review-model';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  subscription: Subscription;
  KEY: string = 'reviews';
  reviews: Reviews = new Set();
  reviewsSubject: Subject<Reviews> = new Subject();

  constructor() {}

  getReviews(): Observable<Reviews> {
    const reviewsArray = JSON.parse(localStorage.getItem(this.KEY)) as Review[];

    this.reviews.clear();

    !!reviewsArray.length
      ? reviewsArray.forEach((review) => this.reviews.add(review))
      : 'pass';

    this.reviewsSubject.next(this.reviews);
    return this.reviewsSubject.asObservable();
  }

  setReviews(newReview: Review): void {
    this.reviews.forEach((oldReview) =>
      oldReview.email === newReview.email &&
      oldReview.productID === newReview.productID
        ? this.reviews.delete(oldReview)
        : 'pass'
    );
    this.reviews.add(newReview);
    this.reviewsSubject.next(this.reviews);
    localStorage.setItem(this.KEY, JSON.stringify([...this.reviews]));
  }
}
