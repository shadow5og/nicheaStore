import { Component, OnInit, Input } from '@angular/core';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number;
  pages: [number[], [boolean, boolean]];
  category: string;
  paginationSub: Subscription;
  @Input() params: ParamMap;

  constructor(private paginationService: PaginationService) {
    this.paginationSub = paginationService
      .onNewPageGroup()
      .subscribe((pagination: [number[], [boolean, boolean]]) => {
        console.log(this.currentPage);
        paginationService.page = this.currentPage;
        this.pages = pagination;
        this.category = this.params.get('category');
        console.log(this.pages);
      });
  }

  toString(page: number): string {
    return page.toString();
  }

  resolveRoute(page: number): string {
    if (this.category) {
      return `/products/${this.category}/${page}`;
    }

    return `/products/${page}`;
  }

  ngOnInit(): void {}
}
