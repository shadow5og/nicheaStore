export interface CategoryImage {
  name: string;
  content: any;
  contentType: string;
  id: string;
}

export default interface Category {
  id: string;
  name: string;
  description?: string;
  image: CategoryImage;
}
