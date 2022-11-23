import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BackendService} from "../../_service/data/backend.service";
import {User} from "../../_class/user";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthentificationService} from "../../_service/auth/authentification.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  id:number | undefined;
  user! : User
  message! :string
  userForm!:FormGroup

  constructor(private activateroute:ActivatedRoute,
              private auth:AuthentificationService,
              private  router:Router,
              private backendservice:BackendService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.retreiveUser();
  }

  retreiveUser() {
    return this.backendservice.retreiveUser(this.auth.getAuthenticateUser())
      .subscribe(
        response => {
          this.user = response
        }
      )
  }
  updateUser() {
    if (this.auth.getId()){
      this.backendservice.updateUser(this.auth.getId(),  this.user)
        .subscribe(
          data => {
            this.message = "update is successfull"
            console.log("click save" + data)
            this.router.navigate(['products', this.auth.getId()])
          }
        )
    }
  }

  return() {
    this.router.navigate(['products', this.auth.getId()])
  }
}
