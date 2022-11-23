import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../../_class/constant";
import {map} from "rxjs";


export const TOKEN= 'token';
export const ID= 'id';
export const AUTHENTICATE_USER = 'authentificateuser';
@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private  http:HttpClient) { }

  executeBasicAutheticationService(email:any, password:any){
    return this.http.post<any>(`${API_URL}/auth/login`,
      {
        email,
        password
      }).pipe(
        map(
          data => {
            sessionStorage.setItem(ID, data.id)
            sessionStorage.setItem(AUTHENTICATE_USER, email);
            sessionStorage.setItem(TOKEN, `Bearer ${data.accessToken}`);
         //   console.log(`Bearer ${data.accessToken}`)
            return data;

          }
        )
    )
  }
  getAuthenticateUser(){
    return sessionStorage.getItem(AUTHENTICATE_USER);
  }
  getId(){
    return sessionStorage.getItem(ID);
  }
  getAuthenticateToken(){
    return sessionStorage.getItem(TOKEN);
  }
  isUserLoggin(){
    let  user = sessionStorage.getItem(AUTHENTICATE_USER);
    return!(user==null)
  }
  loggOut(){
    sessionStorage.removeItem(TOKEN);
    sessionStorage.removeItem(AUTHENTICATE_USER);
  }
}
