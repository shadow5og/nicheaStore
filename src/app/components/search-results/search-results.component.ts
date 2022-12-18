import { Component, OnInit, Output } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { Subscription } from 'rxjs';
import SearchResult, { ProductInfo } from 'src/app/models/searchResponse-model';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css'],
})
export class SearchResultsComponent implements OnInit {
  private subscription: Subscription;
  showSearch: boolean;

  products: Array<ProductInfo>;
  imageLink: string = this.searchService.productImage;

  constructor(
    private searchService: SearchService,
    private uiService: UiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscription = this.searchService
      .onSearch()
      .subscribe((data: SearchResult | ProductInfo) => {
        const result = data as SearchResult;
        if (result.content?.length) {
          this.products = result.content;
        }
      });

    this.subscription.add(
      this.uiService.afterSearch().subscribe((showSearch: boolean) => {
        this.showSearch = showSearch;
      })
    );
  }

  navigateAway = async (product: string): Promise<void> => {
    try {
      this.router.navigate(['./product', product]);
      this.uiService.toggleSearchResults();
    } catch (e: any) {
      console.log(e.message);
    }
  };
}