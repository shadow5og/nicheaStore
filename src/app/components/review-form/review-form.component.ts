import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import Review from 'src/app/models/review-model';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import Alert from 'src/app/models/alerts-model';
import { ModalExampleComponent } from '../modal-example/modal-example.component';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css'],
})
export class ReviewFormComponent implements OnInit {
  userRating = 0;
  name: string;
  email: string;
  subject: string;
  review: string;
  @Output() onReview: EventEmitter<Review> = new EventEmitter();
  @Input() productID: string;
  alert: Alert = {
    type: 'success',
    message: 'Successfully Reviewed.',
  };

  constructor(private modalService: NgbModal) {}

  openModal() {
    const options: NgbModalOptions = {
        size: 'lg',
        backdrop: 'static',
      },
      modalRef = this.modalService.open(ModalExampleComponent, options);

    modalRef.componentInstance.alert = Object.assign({}, this.alert);
  }

  onSubmit(): void {
    const review = {
      name: this.name,
      email: this.email,
      subject: this.subject,
      review: this.review,
      rating: this.userRating,
      productID: this.productID,
      createdDate: new Date(),
    } as Review;

    this.onReview.emit(review);
    this.openModal();
  }

  ngOnInit(): void {}
}
