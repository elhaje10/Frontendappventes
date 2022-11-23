import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthentificationService} from "../../_service/auth/authentification.service";
import {Product} from "../../_class/product";
import {BackendService} from "../../_service/data/backend.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productId!: number;
  product! : Product
  message! :string
  constructor(private activateroute:ActivatedRoute, private auth:AuthentificationService,
              private backservice: BackendService, private  route:Router) { }

  ngOnInit(): void {
    this.productId = this.activateroute.snapshot.params['productId']
    //console.log(this.productId )
    this.retreiveProduct()
  }

  retreiveProduct() {
    return this.backservice.retreiveProduct(this.productId)
      .subscribe(
        response => {
          this.product = response
          //console.log(response)
        }
      )
  }


  updateProduct() {
    if (this.auth.getId()){
      this.backservice.updateProduct(this.auth.getId(), this.productId, this.product)
        .subscribe(
          data => {
            console.log("click save" + data)
            this.route.navigate(['products', this.auth.getId()])
          }
        )
    }

    // console.log("click" +  console.log("click save :" + JSON.stringify(this.product)))
  }

  delete() {
    return this.backservice.deleteProduct(this.auth.getId(), this.productId)
      .subscribe(
        response => {
             console.log(response)
          this.message= `Delete of todo number ${this.productId} successfull`!;
          this.route.navigate(['products', this.auth.getId()])
        }

      )

  }
}
