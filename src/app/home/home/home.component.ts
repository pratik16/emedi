import { Component, OnInit, HostListener } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { map, concatAll } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cat: any;
  allCategories: any;
  mainCategories: any;
  productList: any;
  defaultProductImage:String = "https://www.emedimarket.com/assets/emedi_market.png";
  allSubCatStoreEvent: any;
  mainCatStoreEvent: any;
  allProductStoreEvent: any;
  page: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize() {
  }
  
  constructor(private category: CategoryService, public product: ProductService) { 
    
  }

  ngOnInit(): void {
    //left side categories
    this.category.getSubCategories();
    this.allSubCatStoreEvent = this.category.$_allSubCatStore.pipe(map(r1 => r1.data)).subscribe(
      (r) => {
        this.allCategories = Object.assign([], r)['data'];
      }
    );

    //Main page, main categories
    this.category.getMainCategories();
    this.mainCatStoreEvent = this.category.$_mainCatStore.pipe(map(r1 => r1.categories)).subscribe(
      (r) => {
        this.mainCategories = Object.assign([], r);
      }
    );
  //  this.fetchMore(false);  
    this.allProductStoreEvent = this.product.$_allProductStore.pipe(map(r1 => r1.data)).subscribe(
      (r) => {
        if (this.productList) {
          this.productList = this.productList.concat(Object.assign([], r)['data']);
        }
        else {
          this.productList = Object.assign([], r)['data'];
        }
      }
    );

  }

  ngAfterViewChecked() {
   // $('.carousel').carousel();
  }

  fetchMore($event:any) {
		if(this.product.productLoading === true){
			return false;
		}
		
	  this.getProducts($event);
    

    return true;
	}

  getProducts($event:any) {
    this.page++;
    this.product.getProducts($event, this.page);
   
  }

  ngOnDestroy() {
    this.allSubCatStoreEvent.unsubscribe();
    this.mainCatStoreEvent.unsubscribe();
    this.allProductStoreEvent.unsubscribe();
  }

}
