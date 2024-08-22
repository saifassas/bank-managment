import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');
    
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status === 401) {
            // Handle 401 status in response, if needed
            localStorage.removeItem('accessToken');
            this.router.navigate(['/login']);
            throw new Error('Invalid token');
          }
        }
        return event;
      }),
      catchError(err => {
        if ([401, 403].includes(err.status)) {
          // Auto logout if 401 or 403 response returned from API
          localStorage.removeItem('accessToken');
          this.router.navigate(['/login']);
        }

        const error = err.error?.errorMessage || err.statusText;
        console.error(err);
        
        return throwError(() => new Error(error));
      })
    );
  }
}
