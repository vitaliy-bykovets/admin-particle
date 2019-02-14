import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiURL } from '@env/environment';


@Injectable()
export class AgroService {
  public createField(data: any): Observable<any> {
    return this.http.post(`${apiURL.agroField}`, data);
  }

  public getField(id: number): Observable<any> {
    return this.http.get(`${apiURL.agroField}/${id}`);
  }

  public updateFiled(id: number, data: any): Observable<any> {
    return this.http.put(`${apiURL.agroField}/${id}`, data);
  }

  public deleteFiled(id: number): Observable<any> {
    return this.http.delete(`${apiURL.agroField}/${id}`);
  }

  constructor(private http: HttpClient) {}
}
