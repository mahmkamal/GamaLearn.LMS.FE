import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../../app.config';
  // tslint:disable:no-shadowed-variable

@Injectable()
export class BookService {

  constructor(private http: HttpClient, private config: AppConfig) { }
  getById(id:any): Observable<any> {
    return this.http.get(this.config.getHost() + '/books/' + id);
  }
  getAll(): Observable<any> {
    return this.http.get(this.config.getHost() + '/books');
  }
  save(employee: any): Observable<any> {
    return this.http.post(this.config.getHost() + '/books',employee);
  }
}
