import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  // set api endpoint
  endpoint = `${environment.apiUrl}/users`;

  // get all users info.
  getAll() {
    return this.http.get<User[]>(`${this.endpoint}/all`);
  }
}
