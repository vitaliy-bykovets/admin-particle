import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { apiURL } from '@env/environment';

@Injectable()
export class AuthService {

  public login(params): Observable<any> {
    return this.http.post(`${apiURL.signin}`, params, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  public register(params): Observable<any> {
    return this.http.post(`${apiURL.signup}`, params, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  constructor(private http: HttpClient) {}
}
