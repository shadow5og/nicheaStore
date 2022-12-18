import { Component, Input, OnInit } from '@angular/core';
import {
  ProductInfo,
  PriceInformation,
} from 'src/app/models/searchResponse-model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';
import { PaginationService } from 'src/app/services/pagination.service';
import resolveLink, { getLowestPrice } from 'src/app/utils/utils';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent implements OnInit {
  @Input() products: ProductInfo[];
  imageLink: string = 'https://www.nichea.co.za/nichea/file/';
  category: string;
  isCategory: boolean = true;
  currentPage: number = 0;
  oldPage:number;
  parameters: ParamMap;
  subscription: Subscription;
  pagination: [number[], [boolean, boolean]];

  constructor(
    private route: ActivatedRoute,
    private catalogue: SearchService,
    private paginationService: PaginationService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap.subscribe(
      (parameter: ParamMap) => {
        this.parameters = parameter;
        this.category = parameter.get('category');
        this.oldPage = this.currentPage;
        this.currentPage = parseInt(parameter.get('page'));

        !Boolean(this.currentPage) ? this.currentPage = 1 : '' ;

        this.paginationService.page = this.currentPage;

        this.catalogue.search(
          this.category,
          this.isCategory,
          this.currentPage
        );
      }
    );

    this.subscription.add(
      this.paginationService
        .onNewPageGroup()
        .subscribe((pagination: [number[], [boolean, boolean]]) => {
          this.pagination = pagination;
        })
    );
  }

  getLowestPrice(prices: PriceInformation[]): number {
    return getLowestPrice(prices);
  }

  resolveLink(product:string):string{
    return resolveLink(null, null, product);
  }
}
