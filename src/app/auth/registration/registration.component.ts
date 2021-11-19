import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  loading_register: boolean = false;
  registerError: any = null;
  registerForm: any = {};
  countries: any = [];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) { 

    
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
			'first_name': ['', Validators.required],
			'last_name': ['', [Validators.required]],
			'email': ['', [Validators.required, ValidationService.emailValidator]],
			'password': ['', [Validators.required]],
			'password_confirmation': ['', [Validators.required]],
			'phone': ['', [Validators.required]],
      'gender': ['', []],
      'term': ['', [Validators.required]],
      'country_id': ['', [Validators.required]],
    });
    
    this.userService.config().subscribe((data:any) => {
			this.countries = Object.assign([{ "": "Select country" }], data.countries);
		});
  }

  doRegister(e:any) {
    e.preventDefault();
    this.registerError = false;
		if (this.registerForm.valid) {
			this.loading_register = true;
			let args = this.registerForm.value;
			//args.password_confirmation = args.password;
		/*	this.userService.register(args).subscribe((data: any) => {
        let success = data.json();
        console.log(success);
				/*this.user = success.data;
				this.auth.setUser(this.user, false);
				this.loading_register = false;
				this.setActiveForm('login');

			}, (error:any) => { 
        let e = error.error;
        this.registerError = e;
				this.loading_register = false;

			})*/
    }
    
    return false;
  }

}
