import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';
import SearchResult, { ProductInfo } from 'src/app/models/searchResponse-model';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  private searchSub: Subscription;
  private showSearchSub: Subscription;
  showSearch: boolean;
  products: Array<ProductInfo>;
  imageLink:string = this.searchService.productImage;

  constructor(
    private searchService: SearchService,
    private uiService: UiService
  ) {
    this.searchSub = this.searchService
      .onProductSearch()
      .subscribe((result: SearchResult) => {
        if (result?.content.length > 0) {
          this.products = result.content;
          console.log(this.products);
        }
      });
    this.showSearchSub = this.uiService
      .afterSearch()
      .subscribe((showSearch: boolean) => {
        this.showSearch = showSearch;
        console.log(this.showSearch);
      });
  }

  ngOnInit(): void {}
}

// this.searchResults?.content.length > 0 ? this.searchResults : null;
