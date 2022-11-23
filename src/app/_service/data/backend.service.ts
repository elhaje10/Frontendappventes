import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../_class/constant";
import {Product} from "../../_class/product";
import {User} from "../../_class/user";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private  http:HttpClient) { }

  getAllHomeProducts(){
    return this.http.get<Product[]>(`${API_URL}/products`)
  }
  getAllProducts(userId:number){
    return this.http.get<Product[]>(`${API_URL}/users/${userId}/products`)
  }
  addProducts(userId: any , product: Product){
    return this.http.post(`${API_URL}/users/${userId}/addproducts`, product)
  }

  retreiveProduct(productId:number){
    return this.http.get<Product>(`${API_URL}/products/${productId}`)
  }

  updateProduct(userId: any , productId: number, product: Product){
    return this.http.put(`${API_URL}/users/${userId}/products/${productId}`, product)
  }
  deleteProduct(userId: any , productId: number){
    return this.http.delete(`${API_URL}/users/${userId}/products/${productId}`)
  }

  register(user: User){
    return this.http.post(`${API_URL}/auth/adduser`, user)
  }
  retreiveUser(email: any){
    return this.http.get<User>(`${API_URL}/users/${email}`)
  }

  updateUser(userId: any , user: User){
    return this.http.put(`${API_URL}/users/${userId}`, user)
  }

  resetpassword(email: any , user: User){
    return this.http.put(`${API_URL}/users/forgetpassword/${email}`, user)
  }
}
