import { Observable, throwError  } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable()
export class HttpMockRequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  private token: string = 'token';

  private getToken(): string {
    this.token = 'new token';
    return this.token;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getToken()}`
      }
    });
    console.log(this.token);
    return next.handle(request)
      .pipe(catchError((error) => {
        return throwError(error);
      }));
  }
}
