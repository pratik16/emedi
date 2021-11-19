import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as global from '../common/global';


@Injectable()
export class CategoryService {

  private _url = global.api_url + 'wonshop/category/allc';
  private _url2 = global.api_url + 'wonshop/category/c';
  private _catDetailUrl = global.api_url + 'wonshop/c/detail';


  private _allSubCatStore = new BehaviorSubject<Object>([]);
  $_allSubCatStore: Observable<any> = this._allSubCatStore.asObservable();

  private _mainCatStore = new BehaviorSubject<Object>([]);
  $_mainCatStore: Observable<any> = this._mainCatStore.asObservable();

  private _catDetailStore = new BehaviorSubject<Object>([]);
  $_catDetailStore: Observable<any> = this._catDetailStore.asObservable();

  public request: any = {
    page: 0,
    cat_id: 0
  };

  constructor(private http: HttpClient) { }

  getSubCategories() {
    return this.http.get(this._url).subscribe(
      res => {
        this._allSubCatStore.next(res);
      }
    );
  }

  getMainCategories() {
    return this.http.get(this._url2).subscribe(
      res => {
        this._mainCatStore.next(res);
      }
    );
  }

  getCategoryDetail() {
    let url = this._catDetailUrl + '/' + this.request.cat_id;
    return this.http.get(url).subscribe(
      res => {
        this._catDetailStore.next(res);
      }
    );
  }

  resetMainCatStore() {
    this._mainCatStore.next([]);
  }

  resetCatDetailStore() {
    this._catDetailStore.next([]);
  }

}
