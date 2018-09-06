import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import { apiURL } from "@env/environment";

@Injectable()
export class AuthService {

  public login(params): Observable<any> {
    return this.http.get(`${apiURL.signin}`, {
      params
    });
  }

  constructor(private http: HttpClient) {}
}
