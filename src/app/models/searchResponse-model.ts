import Category, { CategoryImage } from './category-model';

interface SortStatus {
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  sort: SortStatus;
  pageSize: number;
  pageNumber: number;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface PriceInformation {
  size: string;
  cost: number;
  retail: number;
  special: number;
  image: CategoryImage;
}

export interface ProductInfo extends Category {
    code: string | null;
    category:Category;
    prices:PriceInformation[];
    youtube:string;
}

export default interface SearchResult {
    content:Array<ProductInfo>;
    pageable:Pageable;
    last:boolean;
    totalElements:number;
    totalPages:number;
    sort:SortStatus;
    first:boolean;
    numberOfElements:boolean;
    size:number;
    number:number
}
