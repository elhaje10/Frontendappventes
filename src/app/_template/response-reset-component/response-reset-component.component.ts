import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, AbstractControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { CustomValidators } from '../../_class/CustomValidators';
import {BackendService} from "../../_service/data/backend.service";

@Component({
  selector: 'app-response-reset-component',
  templateUrl: './response-reset-component.component.html',
  styleUrls: ['./response-reset-component.component.css']
})
export class ResponseResetComponentComponent implements OnInit {
  ResponseResetForm: FormGroup= new FormGroup({});
  errorMessage: string | undefined;
  emailverif: string | undefined;
  successMessage: string | undefined;

  CurrentState: any;
  IsResetFormValid = true;
  constructor(private fb: FormBuilder, private backendservice:BackendService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.ResponseResetForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      }, [CustomValidators.MatchValidator('password', 'confirmPassword')]);
  }
  get passwordMatchError() {
    return (
      this.ResponseResetForm.getError('mismatch') &&
      this.ResponseResetForm.get('confirmPassword')?.touched
    );
  }

  get ConfirmPassword() {
    return this.ResponseResetForm.get('confirmPassword');
  }
  get NewPassword() {
    return this.ResponseResetForm.get('password');
  }
  get Email() {
    return this.ResponseResetForm.get('email');
  }
  
  ResetPassword(){
    this.backendservice.resetpassword(this.ResponseResetForm.value.email,this.ResponseResetForm.value)
      .subscribe(
      data => {
        this.ResponseResetForm.reset();
        this.successMessage = "update successuflly";
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 3000);
      },
      err => {
        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
      }
    );

  }
}
