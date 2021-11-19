import { Component, OnInit, HostListener } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit {

  allCategories: any;
  productList: any;
  catId: any;
  categoryDetail: any;
  defaultProductImage: String = "https://www.emedimarket.com/assets/emedi_market.png";
  allCatProductStoreEvent: any;
  catDetailStoreEvent: any;
  allSubCatStoreEvent: any;
  routerEvent: any;
  page: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize() {
  }

  constructor(private router: Router, private route: ActivatedRoute, private category: CategoryService, public product: ProductService) { }

  ngOnInit(): void {
   // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.routerEvent = this.route.paramMap.subscribe(paramMap => {
      this.category.request.cat_id = this.product.request.cat_id = this.catId = paramMap.get('cat_id');
    });

    //left side categories
    this.category.getSubCategories();
    this.allSubCatStoreEvent = this.category.$_allSubCatStore.pipe(map(r1 => r1.data)).subscribe(
      (r) => {
        this.allCategories = Object.assign([], r)['data'];
      }
    );

    //main category details
    this.category.getCategoryDetail();
    this.catDetailStoreEvent = this.category.$_catDetailStore.pipe(map(r1 => r1.data)).subscribe(
      (r) => {
        console.log("hi");
        this.categoryDetail = r;
      }
    );
   // this.fetchMore(false);  
    this.allCatProductStoreEvent = this.product.$_allCatProductStore.pipe(map(r1 => r1.data)).subscribe(
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

  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    this.resetComponentParams();
    this.allCatProductStoreEvent.unsubscribe();
    this.catDetailStoreEvent.unsubscribe();
    this.allSubCatStoreEvent.unsubscribe();
    
    this.category.resetMainCatStore();
    this.category.resetCatDetailStore();
    this.product.resetAllCatProductStore();

    this.routerEvent.unsubscribe();
  }

  fetchMore($event: any) {
    if (this.product.catProductLoading === true) {
      return false;
    }
    
    this.getCatProducts($event);


    return true;
  }

  getCatProducts($event: any) {
    this.page++;
    this.product.getCatProducts($event, this.page);

  }

  resetComponentParams() {
    this.page = 0;
    delete this.productList;
    delete this.categoryDetail;
  }

}
