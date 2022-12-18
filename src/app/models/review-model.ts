import { ProductInfo } from "./searchResponse-model";

export default interface Review {
  name: string;
  email: string;
  subject: string;
  review: string;
  rating: number;
  productID: string;
  createdDate: Date;
}

export type Reviews = Set<Review>;
