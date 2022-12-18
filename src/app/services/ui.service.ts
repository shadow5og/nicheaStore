import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import SearchResult, { ProductInfo } from '../models/searchResponse-model';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private showItem: boolean = false;
  private showSearchResults: boolean;
  private productSearchSub: Subscription;
  private stick: boolean = false;
  private toggleSubject = new Subject<boolean>();
  private stickySubjects: Map<number, Subject<boolean>> = new Map();
  private searchSubject = new Subject<boolean>();
  scrollTop: number;
  scrollSubject: Subject<number> = new Subject();

  constructor(private searchService: SearchService) {
    this.productSearchSub = this.searchService
      .onSearch()
      .subscribe((data: SearchResult | ProductInfo) => {
        const result = data as SearchResult;
        if (!result.content?.length) {
          this.showSearchResults = false;
        } else {
          this.showSearchResults = true;
        }

        this.searchSubject.next(this.showSearchResults);
      });

    this.onScroll();
  }

  afterSearch(): Observable<boolean> {
    return this.searchSubject.asObservable();
  }

  toggleSearchResults():void{
    this.showSearchResults = !this.showSearchResults;
    this.searchSubject.next(this.showSearchResults);
  }

  toggleItem(): void {
    this.showItem = !this.showItem;
    this.toggleSubject.next(this.showItem);
  }

  onToggle(): Observable<boolean> {
    return this.toggleSubject.asObservable();
  }

  sticky(stickLocation: number): void {
    if (this.scrollTop > stickLocation) {
      this.stick = true;
    } else {
      this.stick = false;
    }

    this.stickySubjects.get(stickLocation).next(this.stick);
  }

  onWindowScroll(): Observable<number> {
    return this.scrollSubject.asObservable();
  }

  stickyChange(stickyLocation: number): Observable<boolean> {
    if (this.stickySubjects.has(stickyLocation)) {
      return this.stickySubjects.get(stickyLocation).asObservable();
    }

    const subject = new Subject<boolean>();
    subject.next(false);
    this.stickySubjects.set(stickyLocation, subject);
    return this.stickySubjects.get(stickyLocation).asObservable();
  }

  onScroll(): void {
    window.addEventListener('scroll', () => {
      this.scrollTop = window.document.documentElement.scrollTop;
      this.scrollSubject.next(this.scrollTop);
    });
  }
}
