import { Component, Input } from '@angular/core';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
	selector: 'http-message',
	template: `
		<div class="alert toggle-alert alert-{{_type}}" [ngClass]="{active : showMessage}">
			<p *ngFor="let error of errorMessage">{{ error }} &nbsp;</p>
			<p (click)="closeMessage()" class="close"><i class="material-icons">close</i></p>
		</div>`,
	styles : ['alert{height:0; } .material-icons{vertical-align: text-bottom; font-size: 1em;}'],

})
export class HttpMessage {
	errorMessage: any = [];
	showMessage: boolean = false;
	_type: any = "danger";
	

	@Input('type') set type(value:any){
		if(value == 'error'){
			this._type = 'danger';
		}else{
			this._type = value;
		}
	};

	@Input('data') set data(response:any){
		this.errorMessage = [];
		if(typeof response == 'string'){
			this.showMessage = true;
			this.errorMessage.push(response);
		}else if(response != undefined && response != null && response.status != undefined){
			switch (response.status) {
				case 200:
					this._type = 'success';
					break;

				case 500:
				case 404:
				case 403:
				case 400:
					this._type = 'danger';
					break;
				
				default:
					break;
			}
			let error;
			if(response.json != undefined){
				error = response.json();
			}else{
				error = response;
			}
			this.showMessage = true;
			if(error.errors != undefined){
				let all_errors:any = error.errors;
				Object.keys(all_errors).map((key) => {
					for(let er of all_errors[key]) {
						this.errorMessage.push(er);
					}
				});
			}else if(error.messages != undefined){
				let all_errors:any = error.messages;
				Object.keys(all_errors).map((key) => {
					for(let er of all_errors[key]) {
						this.errorMessage.push(er);
					}
				});
			}else if(error.message != undefined || error.message != null){
  				this.errorMessage.push(error.message);
			}
		}else{
			this.showMessage = false;
			this.errorMessage = [];
		}
	};
	
	constructor() {
		
	}

	closeMessage() {
		this.showMessage = false;
		setTimeout(()=>{
			this.errorMessage = [];
		},500);
	}
}
