import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../_service/auth/authentification.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
 // isUsserlogged: boolean = false;
  id!:string | null

  constructor(public authentic:AuthentificationService) { }

  ngOnInit(): void {
    if (this.authentic.getId()){
      this.id =this.authentic.getId()
      //console.log(this.id)
    }

    //this.isUsserlogged = this.authentic.isUserLoggin();
  }

}
