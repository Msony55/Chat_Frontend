import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../user/user';
import { Observable,  throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  _url = 'https://web-chat-app55.herokuapp.com/api/signup';

  constructor(private _http: HttpClient) { 
  }

  getHeaders(){
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  signup(user:User){
    return this._http.post<any>(this._url, user).pipe(
      catchError(error => {
        console.log(error);
      return throwError(error);
    }));
  }
}
