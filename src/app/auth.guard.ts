import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SigninServices } from './components/services/signin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private signinService:SigninServices,private router:Router){}

  canActivate(){
   if(this.signinService.loggedIn()){
     return true
   }else{
     this.router.navigate(['./'])
     return false
   }
  }
}
