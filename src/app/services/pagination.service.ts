import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import SearchResult, { ProductInfo } from '../models/searchResponse-model';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private _page: number;
  private pagination: [number[], [boolean, boolean]];
  private paginationSubject: Subject<[number[], [boolean, boolean]]> =
    new Subject();
  private subscriptions: Subscription;
  private queryResults: SearchResult;

  constructor(private query: SearchService) {
    this.subscriptions = this.query
      .onSearch()
      .subscribe((data: SearchResult | ProductInfo) => {
        this.queryResults = data as SearchResult;
        this.pageGroup();
      });
  }

  get page(): number {
    return this._page;
  }

  set page(page: number) {
    this._page = page;
  }

  pageGroup(): void {
    const numPages: number = this.queryResults.totalPages,
      page = this._page,
      pagesLeft = numPages - page;
    let pages: number[];

    if (pagesLeft >= 2 || (numPages > 3 && pagesLeft <= 2 && pagesLeft > 0)) {
      if (page % 3 === 1) {
        pages = [page, page + 1, page + 2];
      } else if (page % 3 === 2) {
        pages = [page - 1, page, page + 1];
      } else if (page % 3 === 0) {
        pages = [page - 2, page - 1, page];
      }
    } else if (pagesLeft === 1) {
      if (page % 3 === 1) {
        pages = [page, page + 1];
      } else {
        pages = [page - 1, page];
      }
    } else {
      pages = [page];
    }

    this.pagination = [pages, this.beginEnd(pages)];
    this.paginationSubject.next(this.pagination);
  }

  onNewPageGroup(): Observable<[number[], [boolean, boolean]]> {
    return this.paginationSubject.asObservable();
  }

  beginEnd(pages: number[]): [boolean, boolean] {
    if (
      pages[0] != 1 &&
      pages[pages.length - 1] != this.queryResults.totalPages
    ) {
      return [true, true];
    } else if (
      pages[0] == 1 &&
      pages[pages.length - 1] != this.queryResults.totalPages
    ) {
      return [false, true];
    } else if (
      pages[0] != 1 &&
      pages[pages.length - 1] == this.queryResults.totalPages
    ) {
      return [true, false];
    }

    return [false, false];
  }
}
