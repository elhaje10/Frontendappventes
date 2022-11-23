import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {BackendService} from "../../_service/data/backend.service";
import {ActivatedRoute, Router} from "@angular/router";
import { CustomValidators } from '../../_class/CustomValidators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  addForm: FormGroup = new FormGroup({});
  errorMessage!: string
  successMessage!: string
  InvalidLogin = false
  private readonly name_pattern = '^[a-zA-Z- ]+$';
  private readonly email_pattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private formBuilder: FormBuilder, private  backservice:BackendService,
              private  route:Router, private activateroute:ActivatedRoute) { }

  ngOnInit(): void {
    //this.addForm = this.formBuilder.group({
    //  firstname: ['', [Validators.required, Validators.email,Validators.pattern(this.name_pattern)]],
    //  lastname: ['', [Validators.required, Validators.email,Validators.pattern(this.name_pattern)]],
    //  email: ['', [Validators.required, Validators.email,Validators.pattern(this.email_pattern)]],
    //  password: ['', [Validators.required, Validators.minLength(6)]],
    //  confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    //});

    this.addForm = new FormGroup({
      firstname: new FormControl('', [Validators.required,  Validators.pattern(this.name_pattern)]),
      lastname: new FormControl('', [Validators.required, Validators.pattern(this.name_pattern)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.email_pattern)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, [CustomValidators.MatchValidator('password', 'confirmPassword')]);
  }

  get Email() {
    return this.addForm.get('email');
  }
  get Firstname() {
    return this.addForm.get('firstname');
  }
  get Lastname() {
    return this.addForm.get('lastname');
  }

  get Password() {
    return this.addForm.get('password');
  }
  get ConfirmPassword() {
    return this.addForm.get('confirmPassword');
  }
  get passwordMatchError() {
    return (
      this.addForm.getError('mismatch') &&
      this.addForm.get('confirmPassword')?.touched
    );
  }
  register() {
   this.backservice.register(this.addForm.value)
     .subscribe(
       data => {
         this.addForm.reset();
         this.InvalidLogin = false;
         this.successMessage = "register successuflly";
         setTimeout(() => {
           this.route.navigate(['login']);
         }, 1000);
       },
       error => {
         this.InvalidLogin = true;
          this.errorMessage = error.error.message;
          console.log(this.errorMessage)
       }
     )
  }
}
