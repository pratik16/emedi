import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as global from '../common/global';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  headers:any;
  token : any = localStorage.getItem("token");
  constructor(private http: HttpClient) {
    this.headers = new Headers();
		this.headers.append('Access-Control-Allow-Origin', '*');    
   }
   
   
   private _url = global.api_url;
   
   config() {
    
    console.log("token  ==?", this.token);
		return this.http.get(this._url+'chat/message', { headers : {
      "authorization" :  "Bearer"+this.token}
    });
	}

  sendMessage(msgObj : any){

    console.log("msgObj  ===?", msgObj);
    
    return this.http.post(this._url+'chat/message', msgObj, { headers : {
      "authorization" :  "Bearer"+this.token}
    });
  }
}
