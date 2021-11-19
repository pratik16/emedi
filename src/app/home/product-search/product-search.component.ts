import { Component, OnInit, HostListener } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  allCategories: any;
  productList: any;
  catId: any;
  categoryDetail: any;
  defaultProductImage: String = "https://www.emedimarket.com/assets/emedi_market.png";
  allCatProductStoreEvent: any;
  allSubCatStoreEvent: any;
  routerEvent: any;
  page: number = 0;
  searchProductList: any;
  searchProductStoreEvent: any;
  searchString: string | null = '';
  searchCount: string = '';
  searchResultSummaryText: string = '';

  @HostListener('window:resize', ['$event'])
  onResize() {
  }

  constructor(private router: Router, private route: ActivatedRoute, private category: CategoryService, public product: ProductService) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.routerEvent = this.route.paramMap.subscribe(paramMap => {
      this.searchString = paramMap.get('search_string');
      this.resetComponentParams();
    });

    //left side categories
    this.category.getSubCategories();
    this.allSubCatStoreEvent = this.category.$_allSubCatStore.pipe(map(r1 => r1.data)).subscribe(
      (r) => {
        this.allCategories = Object.assign([], r)['data'];
      }
    );

   // this.fetchMore(false);  
    this.searchProductStoreEvent = this.product.$_searchProductStore.pipe(map(r1 => r1.data)).subscribe(
      (r) => {
        if (r && r.total) {
          this.searchCount = r.total;
          this.searchResultSummaryText = `${this.searchString} (${this.searchCount} products are available)`;
        }
        if (this.searchProductList) {
          this.searchProductList = this.searchProductList.concat(Object.assign([], r)['data']);
        }
        else {
          this.searchProductList = Object.assign([], r)['data'];
        }
      }
    );
  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    this.resetComponentParams();
    //this.allCatProductStoreEvent.unsubscribe();
   // this.allSubCatStoreEvent.unsubscribe();
    
    this.category.resetMainCatStore();
    this.product.resetSearchProductStore();

    this.routerEvent.unsubscribe();
  }

  fetchMore($event: any) {
    if (this.product.searchProductLoading === true) {
      return false;
    }
    
    this.getSearchProducts($event);


    return true;
  }

  getSearchProducts($event: any) {
    this.page++;
    this.product.getSearchProduct($event, this.searchString,  this.page);

  }

  resetComponentParams() {
    this.page = 0;
    delete this.productList;
    delete this.categoryDetail;
    
    this.category.resetMainCatStore();
    this.product.resetSearchProductStore();

    
  }

}
