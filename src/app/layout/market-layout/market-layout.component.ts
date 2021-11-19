import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-market-layout',
  templateUrl: './market-layout.component.html',
  styleUrls: ['./market-layout.component.scss']
})
export class MarketLayoutComponent implements OnInit {
  searchText: string = '';
  isLoggedIn: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private user: UserService) { }

  ngOnInit(): void {
    //localStorage.setItem("token", "Smith");
//jconsole.log("hi");
    let token = localStorage.getItem("token");
    if (token && token.length > 0) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
  }

  onSearch(searchText: string): void {
    //console.log(searchText);
    this.searchText = searchText;
    this.router.navigate([`search/${searchText}`], { relativeTo: this.route });
  }

  doLogout():void {
    localStorage.removeItem("token");
    this.isLoggedIn = false;
  }

  doLogin():void {
    //this.user.login();
    localStorage.setItem("token", "test123");
    this.isLoggedIn = true;
  }

}
