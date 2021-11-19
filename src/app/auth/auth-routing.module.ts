import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
    { path: "login", component: LoginComponent, data : { header_type : "inner-home"} },
    { path: "reg", component: RegistrationComponent, data : { header_type : "inner-home"} },
    { path: '**', component: LoginComponent }
  	
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
