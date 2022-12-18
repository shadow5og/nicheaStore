import { NgModule, isDevMode } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule, NgbAlertModule, NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CategoriesShowCase } from './components/product-categories/product-categories.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ProductsComponent } from './pages/products/products.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductComponent } from './pages/product/product.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { SimpleModalComponent } from './components/simple-modal/simple-modal.component';
import { ObjectAssignPipe } from './pipes/object-assign.pipe';
import { ModalExampleComponent } from './components/modal-example/modal-example.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TopBarComponent,
    HeaderComponent,
    FooterComponent,
    CategoriesShowCase,
    AboutComponent,
    ContactComponent,
    SearchBarComponent,
    HomeComponent,
    CarouselComponent,
    ProductsComponent,
    SearchResultsComponent,
    CategoriesComponent,
    CatalogueComponent,
    ShopComponent,
    ProductComponent,
    PaginationComponent,
    SafeUrlPipe,
    ReviewFormComponent,
    ReviewsComponent,
    SimpleModalComponent,
    ObjectAssignPipe,
    ModalExampleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    NgbAlertModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
