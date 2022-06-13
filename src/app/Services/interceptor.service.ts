import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router) 
  { }
  intercept(request:HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    try{
      if(!window.navigator.onLine){
        alert("No Internet Connection")
        return Observable.throw(new HttpErrorResponse({ error: 'Internet is required.'}));
      }
    } catch (error) {
      console.log(error)
    }
    return next.handle(request).pipe(
      map((event:HttpEvent<any>) => {
        if(event instanceof HttpResponse) {

        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if(error.status == 401){
          alert("User has been deleted or deactivated by admin.");
          localStorage.clear()
          this.router.navigate(['/']);
        }
        return throwError(error);
      })
    );
  }
}
