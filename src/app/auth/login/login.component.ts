import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading_register: boolean = false;
  registerError: any = null;
  loginForm: any = {};
  countries: any = [];
  flag : boolean = false;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router : Router
  ) { 

    
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
			'email': ['', [Validators.required, ValidationService.emailValidator]],
			'password': ['', [Validators.required]]			
    });
    
    this.userService.config().subscribe((data:any) => {
			this.countries = Object.assign([{ "": "Select country" }], data.countries);
		});
  }

  doRegister(e:any) {
    e.preventDefault();
    console.log("this.loginForm.value  ===?", this.loginForm.value);
    this.registerError = false;
		if (this.loginForm.valid) {
      this.flag = true;
			this.loading_register = true;
			let args = this.loginForm.value;
      console.log("args  ===?", args);
			//args.password_confirmation = args.password;
			this.userService.login(args).subscribe((data: any) => {
        let success = data;
        console.log(success);
        if(success && success.token)
        {
          localStorage.setItem("token", success.token);
          this.router.navigate(["/"]);
          this.userService.isLoggedIn = true;
          this.flag = false;
        }
				// this.user = success.data;
				// this.auth.setUser(this.user, false);
				// this.loading_register = false;
				// this.setActiveForm('login');

			}, (error:any) => { 
        let e = error.error;
        this.registerError = e;
				this.loading_register = false;

			})
    }
    
    return false;
  }

}
