import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  routerEvent: any;
  prodId: string | null = '';
  productDetailStoreEvent: any;
  productDetail: any;

  constructor(private router: Router, private route: ActivatedRoute, public product: ProductService) { }

  ngOnInit(): void {
   // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.routerEvent = this.route.paramMap.subscribe(paramMap => {
      this.prodId = paramMap.get('prod_id');
    });

    if (this.prodId) {
      this.product.getProductDetail(this.prodId);
    }
    
    this.productDetailStoreEvent = this.product.$_productDetailStore.pipe(map(r1 => r1.data)).subscribe(
      (r) => {
        this.productDetail = Object.assign([], r);
        console.log(this.productDetail);
      }
    );

  }

  ngOnDestroy() {
    this.productDetailStoreEvent.unsubscribe();
    this.product.resetProductDetailStore();
  }

}
