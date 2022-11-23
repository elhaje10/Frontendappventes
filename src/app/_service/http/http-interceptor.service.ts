import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthentificationService} from "../auth/authentification.service";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authentiacteservice:AuthentificationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let email = this.authentiacteservice.getAuthenticateUser();
    let basicAuth = this.authentiacteservice.getAuthenticateToken();

    if (basicAuth && email){
      request = request.clone({
        setHeaders:{
          Authorization : basicAuth,
          Accept: 'application/json',
          'Access-Control-Allow-Origin':'*'
        }
        //headers : request.headers.append('Authorization',basicAuth )
        }
      )
    }
    return next.handle(request);
  }
}
