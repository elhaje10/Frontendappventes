import {DEFAULT_CURRENCY_CODE, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorService} from './_service/http/http-interceptor.service';
import {ErrorComponent} from './_template/error/error.component';
import {LoginComponent} from './_template/login/login.component';
import {HomeComponent} from './_template/home/home.component';
import {FooterComponent} from './_template/footer/footer.component';
import {MenuComponent} from './_template/menu/menu.component';
import {LogoutComponent} from './_template/logout/logout.component';
import {ProductsComponent} from './_template/products/products.component';
import {AddproductComponent} from './_template/addproduct/addproduct.component';
import {RegisterComponent} from "./_template/register/register.component";
import {ProductComponent} from "./_template/product/product.component";
import {ProfilComponent} from "./_template/profil/profil.component";
import {ResponseResetComponentComponent} from "./_template/response-reset-component/response-reset-component.component";

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    MenuComponent,
    LogoutComponent,
    ProductsComponent,
    AddproductComponent,
    RegisterComponent,
    ProductComponent,
    ProfilComponent,
    ResponseResetComponentComponent


  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:HttpInterceptorService, multi:true},
    { provide: DEFAULT_CURRENCY_CODE, useValue: '' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
