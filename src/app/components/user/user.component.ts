import { Component, OnInit , Output, EventEmitter } from '@angular/core';
import { User } from './user';
import { SigninServices } from '../services/signin.service';
import { SignupService } from '../services/signup.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
providedIn: 'root'
})

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  show = true;
  alert:boolean = false;
  data : any;
  status : any;
  message : any;
  public errorMsg:any;
  public sucessMsg:any;
  userModel =new User();
  loginModel = new User();
  socket: any;
  constructor(private _signinServices: SigninServices ,private _signupService : SignupService, private route: Router) { 
  }

  ngOnInit(): void {   
    const signUpButton:any = document.getElementById('signUp');
    const signInButton:any = document.getElementById('signIn');
    const container:any = document.getElementById('container');
    const btnClear:any = document.querySelector('button');
    const inputs:any = document.querySelectorAll('input');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });   

    btnClear.addEventListener('click', () => {
      inputs.forEach((input: { value: string; }) => input.value = '' );
    })
    
  }

  Signup(){
    this._signupService.signup(this.userModel)
        .subscribe(
          data => {
            this.alert=true;
            this.sucessMsg = "Successfully Signup"
            console.log('Success!',data)},
          error => console.log('Error!', error)
        )
  }  
   
  Signin(){
    this._signinServices.signin(this.loginModel)
         .subscribe((res: any) => {
          this.data = res;
          localStorage.setItem('token',res.token);
          this.socket = io.io('https://web-chat-app55.herokuapp.com');
          const userid = res.user.userid;
          this.socket.emit('userid', userid);
          localStorage.setItem('userid',res.user.userid);
          localStorage.setItem('_id',res.user._id);
          this.status = res.user.status;   
          if(localStorage.getItem('token') == res.token){
            this.route.navigate(['/chat'])
            return true
          }
          else{
            return false
          }
         }
         ,error => {this.errorMsg = error;     
          // console.clear();     
          }
         )
  }
}


