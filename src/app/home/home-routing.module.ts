import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
    { path: "", component: HomeComponent, data : { header_type : "inner-home"} },
    { path: "chat", component: ChatComponent, data : { header_type : "inner-home"} },
    { path: "cat/:cat_id", component: ProductListingComponent, data : { header_type : "inner-home"} },
    { path: ":prod_id", component: ProductDetailComponent, data : { header_type : "inner-home"} },
    { path: "search/:search_string", component: ProductSearchComponent, data : { header_type : "inner-home"} },
    { path: '**', component: HomeComponent }
  	
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
