import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription, timeout } from 'rxjs';
import SearchResult from 'src/app/models/searchResponse-model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @ViewChild('searchContainer') searchContainer: ElementRef;
  subscription: Subscription;
  queryString: string;
  showResults:boolean;

  constructor(
    private uiService: UiService,
    private searchService: SearchService
  ) {}

  search(): void {
    console.log(this.queryString);
    if (Boolean(this.queryString?.trim())) {
      setTimeout(() => {
        this.searchService.productSearch(this.queryString);
        this.showResults = true;
      }, 500);
    } else {
      this.showResults = false;
    }
  }

  onClick(): void {
    this.uiService.toggleItem();
  }

  ngOnInit(): void {}
}
