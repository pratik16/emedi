import { Injectable } from '@angular/core';

//import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
//import { AuthHttp } from 'angular2-jwt';

//import { apiUrl } from '../../../config/app.config';
import * as global from '../../common/global';
import { BehaviorSubject, Observable } from 'rxjs';
//import { AuthService } from '../auth.service';

declare let localStorage:any;

@Injectable()
export class UserService {
	_profile_user:any = null;
	user_html_view:boolean = true;
	apiUrl:any;
	url:any;
	headers:any;
	isLoggedIn : boolean = false;

	

	private _allUser = new BehaviorSubject<Object>([]);
	$_allUser: Observable<any> = this._allUser.asObservable();

	constructor(
		public http : HttpClient
	) {
		this.apiUrl = global.api_url;
		this.url = global.url;
		this.headers = new Headers();
		this.headers.append('Access-Control-Allow-Origin', '*');

	}

	register(args:any){
		/*return this.http.post(this.apiUrl('auth/register'), args).subscribe(
			res => {
			  this._allUser.next(res);
			}
		  );*/
		return this.http.post(this.url('auth/register'), args);//((response:Response) => {return response.json()});
	}

	config() {
		return this.http.get(this.url('config'), {  headers: this.headers
		});
	}

	// login(args:any){
	// 	return this.http.get(this.apiUrl('auth/login'), args);//.map((response:Response) => {return response.json()});
	// }

	login(args:any){
		return this.http.post(this.url('auth/login'), args);//.map((response:Response) => {return response.json()});
	}

	/*register(args:any){
		return this.http.post(this.apiUrl('auth/register'), args);//.map((response:Response) => {return response.json()});
	}

	updateRegister(args:any){
		return this.http.post(this.apiUrl('auth/change-details'), args);//.map((response:Response) => {return response.json()});
	}

	resendOtp(args:any){
		return this.http.post(this.apiUrl('auth/resend-otp'), args);//.map((response:Response) => {return response.json()});
	}

	otp(args:any){
		return this.http.post(this.apiUrl('auth/verify-otp'), args);
	}

	forgotPassword(args:any){
		return this.http.post(this.apiUrl('auth/forgetPassword'), args);
	}

	setPassword(args:any){
		return this.http.post(this.apiUrl('auth/resetPassword'), args);
	}

	socailLogin(args:any){
		return this.http.post(this.apiUrl('auth/social-login'), args);
	}

	socailUpdate(args:any){
		return this.http.post(this.apiUrl('auth/social-update'), args);
	}


	getSuggestions(args:any = {}){
		return new Promise((resolve, reject) => {
			this.http.get(this.apiUrl('suggestions'), args).subscribe((success:any)=>{
				let data = success.json();
				resolve(data);
			}, (e:any)=> reject(e));
		});
	}

	chagnePassword(args:any){
		return new Promise((resolve, reject) => {
			this.http.post(this.apiUrl('profile/change-password'), args).subscribe((success:any)=>{
				resolve(success);
			}, (e:any)=> reject(e));
		});
	}

	updateProfile(args:any = {}){
		return new Promise((resolve, reject) => {
			this.http.post(this.apiUrl('profile'), args).subscribe((success:any)=>{
				let data = success.json();
				resolve(data);
			}, (e:any)=> reject(e));
		});
	}

	updateAdditionalProfile(args:any){

		return new Promise((resolve, reject) => {
			//const data = Object.apply({}, args);
			console.log('updateAdditionalProfile', args);
			this.http.post(this.apiUrl('profile/additional'), args).subscribe((success:any)=>{
			
				let data = success.json();
				resolve(data);
			}, (e:any)=> reject(e));
		});
	}

	getProfile(args:any = {}, user_id?:any){

		return new Promise((resolve, reject) => {
			let url:any = "";
			if(user_id != undefined && user_id != "" && user_id != null){
				url = 'profile/'+user_id;
			}else{
				url = 'profile';
			}
			this.http.get(this.apiUrl(url), args).subscribe((success:any)=>{
				let data = success.json();
				resolve(data);
			}, (e:any)=> reject(e));
		});
	}

	getProfileInfo(type:any, args:any = {}, user_id?:any){
		return new Promise((resolve, reject) => {
			let url:any = "";
			if(user_id != undefined && user_id != "" && user_id != null){
				url = 'profile/'+type+'/'+user_id;
			}else{
				url = 'profile/'+type;
			}
			this.http.get(this.apiUrl(url), args).subscribe((success:any)=>{
				let data = success.json();
				resolve(data);
			}, (e:any)=> reject(e));
		});
	}*/

	/* ==================================================
		Contribution
	==================================================== */
	
	/*getContribution(type:any, args:any = {}, user_id?:any, _module:any="livecme"){
		return new Promise((resolve, reject) => {
			let url:any = "";
			if(user_id != undefined && user_id != "" && user_id != null){
				url = 'profile/'+user_id+'/contribution/'+type+'/'+_module;
			}else{
				url = 'profile/contribution/'+type+"/"+_module;
			}
			this.http.get(this.apiUrl(url), args).subscribe((success:any)=>{
				let data = success.json();
				resolve(data);
			}, (e:any)=> reject(e));
		});
	}*/

}
