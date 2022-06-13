import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as ENV } from "../../environments/environment";
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  httpOptionsAuth() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userAccessToken"),
        token: sessionStorage.getItem("userAccessToken"),
        passphrase: "sam&tab"
      })
    };
  }

  api_url = `${ENV.API_URL}`;


  post(payload, url): Observable<any> {
    return this.http.post<any>(this.api_url + url, payload).pipe(
      catchError(error => {
        return error;
      }),
      map(resp => resp)
    );
  }

  put(payload, url): Observable<any> {
    return this.http.put<any>(this.api_url + url, payload).pipe(
      catchError(error => {
        return error;
      }),
      map(resp => resp)
    );
  }

  get( url): Observable<any> {
    return this.http.get<any>(this.api_url + url).pipe(
      catchError(error => {
        return error;
      }),
      map(response => {
        return response;
      })
    );
  }
  get1( url): Observable<any> {
    return this.http.get<any>(this.api_url + url, this.httpOptionsAuth()).pipe(
      catchError(error => {
        return error;
      }),
      map(response => {
        return response;
      })
    );
  }

  post1(payload, url): Observable<any> {
    return this.http
      .post<any>(this.api_url + url, payload, this.httpOptionsAuth())
      .pipe(
        catchError(error => {
          return error;
        }),
        map(resp => resp)
      );
  }

  put1(payload, url): Observable<any> {
    return this.http
      .put<any>(this.api_url + url, payload, this.httpOptionsAuth())
      .pipe(
        catchError(error => {
          return error;
        }),
        map(resp => resp)
      );
  }




  getPosition(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }
 
}
