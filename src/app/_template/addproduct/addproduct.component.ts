import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {BackendService} from "../../_service/data/backend.service";
import {AuthentificationService} from "../../_service/auth/authentification.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  production: string | undefined;
  product_type: string | undefined;
  price: number | undefined;
  id: number | undefined;
  qtt: number | undefined;
  loading: false | undefined;
  submitted = false;
  private readonly name_pattern = '^[a-zA-Z- ]+$';
  addForm!: FormGroup
  //addForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private  backservice:BackendService,
              private auth:AuthentificationService, private  route:Router, private activateroute:ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.activateroute.snapshot.params['id']
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required,Validators.pattern(this.name_pattern)]],
      price: ['', [Validators.required]],
      product_type: ['', [Validators.required,Validators.pattern(this.name_pattern)]],
      qtt: ['', [Validators.required]],

    });

    //this.addForm = new FormGroup({
    //  name: new FormControl(null, [Validators.required,Validators.pattern(this.name_pattern)]),
    //  price: new FormControl(null, [Validators.required]),
    //  product_type: new FormControl(null, [Validators.required,Validators.pattern(this.name_pattern)]),
    //  qtt: new FormControl(null, [Validators.required])

    //})
  }

  createProduct() {

    this.submitted = true;
    /*if (this.addForm.invalid) {
      return;
    }*/

    if (this.auth.getId()){
      this.backservice.addProducts(this.auth.getId(), this.addForm.value)
        .subscribe(
          data => {
            //console.log("click save :" + JSON.stringify(this.addForm.value))
            this.route.navigate(['products', this.auth.getId()])
          }
        )
   }

  }

  return() {
    this.route.navigate(['products', this.auth.getId()])
  }
}
