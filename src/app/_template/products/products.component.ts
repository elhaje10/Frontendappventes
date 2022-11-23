import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BackendService} from "../../_service/data/backend.service";
import {Product} from "../../_class/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  id: number | undefined
  productId: number | undefined
  products! : Product []
  email!:string

  constructor(private activateroute:ActivatedRoute, private  router:Router, private backendservice:BackendService) { }

  ngOnInit(): void {
    this.id = this.activateroute.snapshot.params['id']
    this.getProducts();
  }
  getProducts(){
    if(this.id)
    this.backendservice.getAllProducts(this.id)
      .subscribe(
        response => {
          this.products = response
          console.log(response)
        }
      )
  }

  add() {
    this.router.navigate(['products', this.id,'addproduct' ])
  }

}
