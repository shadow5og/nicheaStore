import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  mobileCollapsed: boolean = true;
  cartCollapsed: boolean = true;
  totalCost: number = 0;
  items: number = 0;
  becomeSticky: boolean;
  showSearch: boolean = false;
  subscription: Subscription;
  @Output() onSticky: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value: boolean) => (this.showSearch = value));
  }

  costPrinter(cost: number): string {
    return 'ZAR' + cost.toFixed(2).toString();
  }

  stickyBar(): void {
    let scrollTop: number = window.document.documentElement.scrollTop;

    if (scrollTop > 53) {
      this.becomeSticky = true;
    } else {
      this.becomeSticky = false;
    }

    this.onSticky.emit(this.becomeSticky);
  }

  hasRoute(route: string): boolean {
    return route === this.router.url;
  }

  toggleShow(): void {
    this.uiService.onToggle();
    this.showSearch = !this.showSearch;
  }

  ngOnInit(): void {
    window.onscroll = (): void => {
      this.stickyBar();
    };
  }
}
