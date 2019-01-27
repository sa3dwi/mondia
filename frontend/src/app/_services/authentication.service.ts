import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  // set api endpoint
  endpoint = `${environment.apiUrl}/users`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  // send username and password to get jwt token
  login(userLogin: any) {
      return this.http.post<any>(`${this.endpoint}/login`, userLogin, this.httpOptions )
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.accessToken) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
              }
              // return user info
              return user;
          }));
  }

  // create new user
  signUp(userInfo: any) {
    return this.http.post<any>(`${this.endpoint}/signup`, userInfo, this.httpOptions )
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.accessToken) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            // return user info
            return user;
        }));
  }

  // remove user from local storage to log user out
  logout() {
      localStorage.removeItem('currentUser');
  }
}
