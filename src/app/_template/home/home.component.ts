import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../_service/auth/authentification.service";
import {Product} from "../../_class/product";
import {BackendService} from "../../_service/data/backend.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products!: Product []

  constructor(public authentic: AuthentificationService, private backservice: BackendService) {
  }

  ngOnInit(): void {
    this.getAllHomeProducts();
  }


  getAllHomeProducts() {
    return this.backservice.getAllHomeProducts()
      .subscribe(
        response => {
          this.products = response
        }
      )
  }
}
