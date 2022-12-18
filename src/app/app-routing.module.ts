// Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductComponent } from './pages/product/product.component';
// import { ModalExampleComponent } from './components/modal-example/modal-example.component';

// Routes
const routes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'products/:category/:page', component: ShopComponent },
  { path: 'products/:page', component: ShopComponent },
  { path: 'product/:name', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {  }
