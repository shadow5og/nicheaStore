import { CategoryImage } from './categoryImage-model';

export interface Category {
  id: string;
  name: string;
  description: string;
  image: CategoryImage;
}
