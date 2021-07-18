import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class SigninServices {
  message:any;
  _url = 'https://web-chat-app55.herokuapp.com/api/signin';
  constructor(private _http: HttpClient){  }

  signin(user:User):Observable<any>{
     return this._http.post<any>(this._url, user).pipe(
      catchError(error => {
        return throwError(error.error.error);
      })
    );
  }

  loggedIn(){
    
    return !!localStorage.getItem('token');
  }

}