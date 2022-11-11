// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductComponent } from './pages/product/product.component';

// Routes
const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'products/:category/:page', component: ShopComponent },
  { path: 'products/:page', component: ShopComponent },
  { path: 'products/name/:name', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
