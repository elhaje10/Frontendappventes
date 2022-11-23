import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthentificationService} from "../../_service/auth/authentification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = ''
  password = ''
  errorMessage = 'Invalid credential'
  InvalidLogin = false

  constructor(private  route:Router, private auth:AuthentificationService) { }

  ngOnInit(): void {
  }

  handleBasiclogin() {
    //console.log(this.email + " "+ this.password);
    this.auth.executeBasicAutheticationService(this.email, this.password)
      .subscribe(
        data => {
         // console.log("the id :"+this.auth.getId());
          this.InvalidLogin = false;
          this.route.navigate(['products', this.auth.getId()])
        },
        error => {
          this.InvalidLogin = true;
          console.log(this.email + " "+ this.password);
        }
      )
  }

  editPassword() {
    this.route.navigate(['resetpassword'])
  }
}
