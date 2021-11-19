import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { ControlMessages } from '../share/directives/control-messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpMessage } from '../share/directives/http-message';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
  declarations: [
    LoginComponent,
    ControlMessages,
    HttpMessage,
    RegistrationComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AuthRoutingModule,
    MaterialModule
    
  ]
})
export class AuthModule { }
