import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./_template/home/home.component";
import {LoginComponent} from "./_template/login/login.component";
import {RouteGuard} from "./_service/route/route.guard";
import {LogoutComponent} from "./_template/logout/logout.component";
import {ProductsComponent} from "./_template/products/products.component";
import {ErrorComponent} from "./_template/error/error.component";
import {RegisterComponent} from "./_template/register/register.component";
import {AddproductComponent} from "./_template/addproduct/addproduct.component";
import {ProductComponent} from "./_template/product/product.component";
import {ProfilComponent} from "./_template/profil/profil.component";
import {ResponseResetComponentComponent} from "./_template/response-reset-component/response-reset-component.component";

const routes: Routes = [
  {path:'', component:HomeComponent },
  {path:'login', component:LoginComponent},
  {path:'home', component:HomeComponent},
  {path:'logout', component:LogoutComponent, canActivate:[RouteGuard]},
  {path:'profile/:id', component:ProfilComponent, canActivate:[RouteGuard]},
  {path:'products/:id', component:ProductsComponent, canActivate:[RouteGuard]},
  {path:'products/:id/edit/product/:productId', component:ProductComponent, canActivate:[RouteGuard]},
  {path:'products/:id/addproduct', component:AddproductComponent, canActivate:[RouteGuard]},
  {path:'register', component:RegisterComponent},
  {path:'resetpassword', component:ResponseResetComponentComponent},
  {path:'**', component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
