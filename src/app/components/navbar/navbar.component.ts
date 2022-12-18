import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  mobileCollapsed: boolean = true;
  cartCollapsed: boolean = true;
  sticky: boolean = false;
  totalCost: number = 0;
  items: number = 0;
  showSearch: boolean = false;
  subscription: Subscription;
  private NAV_STICK_POS: number = 40;
  @Output() stickyChange = new EventEmitter<boolean>();

  constructor(private router: Router, private uiService: UiService) {}

  costPrinter(cost: number): string {
    return 'ZAR' + cost.toFixed(2).toString();
  }

  hasRoute(route: string): boolean {
    return route === this.router.url;
  }

  toggleShow(): void {
    this.uiService.toggleItem();
    this.mobileCollapsed = !this.mobileCollapsed;
  }

  onStickyChange(): void {
    this.stickyChange.emit(this.sticky);
  }

  ngOnInit(): void {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((showSearch: boolean) => (this.showSearch = showSearch));

    this.subscription.add(
      this.uiService
        .stickyChange(this.NAV_STICK_POS)
        .subscribe((sticky: boolean) => {
          if (sticky !== this.sticky) {
            this.sticky = sticky;
            this.onStickyChange();
          }
        })
    );

    this.subscription.add(
      this.uiService
        .onWindowScroll()
        .subscribe(() => this.uiService.sticky(this.NAV_STICK_POS))
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
