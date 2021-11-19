import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import * as global from '../common/global';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _url = global.api_url + 'wonshop/products/p';
  private _productDetailUrl = global.api_url + 'wonshop/p';
  private _searchProductUrl = global.api_url + 'wonshop/p/search';

  private _allProductStore = new BehaviorSubject<Object>([]);
  $_allProductStore: Observable<any> = this._allProductStore.asObservable();
  

  private _allCatProductStore = new BehaviorSubject<Object>([]);
  $_allCatProductStore: Observable<any> = this._allCatProductStore.asObservable();

  private _productDetailStore = new BehaviorSubject<Object>([]);
  $_productDetailStore: Observable<any> = this._productDetailStore.asObservable();

  private _searchProductStore = new BehaviorSubject<Object>([]);
  $_searchProductStore: Observable<any> = this._searchProductStore.asObservable();

  public productLoading: boolean = false;
  public catProductLoading: boolean = false;
  public searchProductLoading: boolean = false;
  

  public request: any = {
    page: 0,
    cat_id: 0
  };


  constructor(private http: HttpClient) { }

  getProducts($event: any, page: number) {

    let params = new HttpParams().set('page', page);
    this.productLoading = true;
    return this.http.get(this._url, { params: params }).subscribe(
      (res: any) => {
        if (res.data.data.length === 0) {
          $event.complete(true);
        }
        else if ($event != false) {
          $event.complete(false);
        }
        this._allProductStore.next(res);
        this.productLoading = false;
      }
    );
  }

  getCatProducts($event: any, page: number) {

    let params = new HttpParams().set('page', page)
      .set('cat_id', this.request.cat_id
      );
    this.catProductLoading = true;
    return this.http.get(this._url, { params: params }).subscribe(
      (res: any) => {
        if (res.data.data.length === 0) {
          $event.complete(true);
        }
        else if ($event != false) {
          $event.complete(false);
        }
        
        this._allCatProductStore.next(res);
        this.catProductLoading = false;
      }
    );
  }

  getProductDetail(id: string | null) {

    return this.http.get(this._productDetailUrl + `/detail/${id}`).subscribe(
      (res: any) => {
        this._productDetailStore.next(res);
      }
    );
  }

  getSearchProduct($event: any, search: any | null, page: any) {

    let params = new HttpParams().set('page', page)
    .set('search', search
    );
    this.searchProductLoading = true;
    return this.http.get(this._searchProductUrl, { params: params }).subscribe(
      (res: any) => {
        if (res.data.data.length === 0) {
          $event.complete(true);
        }
        else if ($event != false) {
          $event.complete(false);
        }
        
        this._searchProductStore.next(res);
        this.searchProductLoading = false;
      }
    );
  }

  resetAllCatProductStore() {
    this._allCatProductStore.next([]);
  }

  resetProductDetailStore() {
    this._productDetailStore.next([]);
  }

  resetSearchProductStore() {
    this._searchProductStore.next([]);
  }
}