import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'control-messages',
  template: `
    <div class="alert alert-danger" *ngIf="errorMessage.length > 0">
      <i class="material-icons">highlight_off</i> <span class="error-message" [innerHtml]="errorMessage[0]"></span>
    </div>`,
  styles : [`
    .alert{
      background-color: none;
      padding: 0;
      margin-bottom: 0;
      border: none;
      border-radius: 0;
      text-align:left
    }
    .material-icons{
      vertical-align: 
      text-bottom; 
      font-size: 1.2em;
    }`]
})
export class ControlMessages {
  errorMessage: any = [];
  //control: any;
  
  @Input('submitted') submitted: boolean = false;
  @Input('type') type: string = "";
  
  @Input('name') name:any = "This field";

  @Input('control') control:any = "";

  constructor() {
    
  }

  ngDoCheck():void {

    if(this.control == undefined){
      if(this.submitted){
        this.errorMessage = [this.name];
      }
    } else if(this.control.touched || this.submitted){
      this.errorMessage = [];
      for (let propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName)) {
          let validatorValue:any = this.control.errors[propertyName];
          if(typeof validatorValue == 'boolean'){
            validatorValue = {name : this.name, type: this.type};
          }else{
            validatorValue.name = this.name;
            validatorValue.type = this.type;
          }
          //validatorValue.name = this.name;
          let message = ValidationService.getValidatorErrorMessage(propertyName, validatorValue);
          this.errorMessage.push(message);
        }
      }
    }
  }

  
}
