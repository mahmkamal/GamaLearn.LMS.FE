import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(public loaderService: LoaderService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    this.loaderService.show();
    if (req.url.includes('login') === false) {
      if (localStorage.getItem('token')) {
        // If we have a token, we set it to the header
        req = req.clone({
          setHeaders: { Authorization: `bearer ${localStorage.getItem('token')}` }
        });
      }
        return next.handle(req).pipe(
          finalize(() => this.loaderService.hide())
        );

    }
    return next.handle(req);
  }


}
