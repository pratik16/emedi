import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { LoadMoreDirective } from '../share/directives/loadmore.directive';
import { LoadingComponent } from '../share/components/loading/loading.component';
import { ImageplaceholderDirective } from '../share/directives/imageplaceholder.directive';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { MaterialModule } from '../material/material.module';
import { ChatComponent } from './chat/chat.component'

import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    HomeComponent,
    LoadMoreDirective,
    LoadingComponent,
    ImageplaceholderDirective,
    ProductListingComponent,
    ProductDetailComponent,
    ProductSearchComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    FormsModule
  ],
  providers : [
    
  ]
})
export class HomeModule { }
