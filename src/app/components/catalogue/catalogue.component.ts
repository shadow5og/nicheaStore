import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { ProductInfo, PriceInformation } from 'src/app/models/searchResponse-model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements AfterContentInit {
  @Input() products:ProductInfo[];
  imageLink:string = 'https://www.nichea.co.za/nichea/file/';
  category:string;
  isCategory:boolean = true;
  currentPage:number;
  parameters:ParamMap;

  constructor( private router:ActivatedRoute, private catalogue:SearchService) { }

  ngAfterContentInit(): void {
    this.router.paramMap.subscribe((parameter:ParamMap) => {
      console.log(parameter);
      this.parameters = parameter;
      this.category = parameter.get('category');
      this.currentPage = parseInt(parameter.get('page'));
      
      this.catalogue.productSearch(this.category, this.isCategory, this.currentPage);
    });
  }

  getLowestPrice(prices:PriceInformation[]):number{
    let minimum = prices[0].cost;

    for (const price of prices){
      price.cost < minimum ? minimum = price.cost : "" ;
    }

    return minimum;
  }
}
