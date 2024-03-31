import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/FirebaseTSAuth/firebaseTSAuth';
import { HomeComponent } from '../pages/home/home.component';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit{
  state = AuthenticatorCompState.LOGIN;

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  firebasetsAuth: FirebaseTSAuth;


  constructor(private router: Router,private bottomSheetRef: MatBottomSheetRef){
    this.firebasetsAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void {
      
  }

  onReset(
    resetEmail:HTMLInputElement){
      let email = resetEmail.value;
      if(this.isNotEmpty(email)) {
        this.firebasetsAuth.sendPasswordResetEmail(
          {
            email: email,
            onComplete: (err) => {
              // alert(`Reste email sent to ${email}`);
              this.bottomSheetRef.dismiss();
            }
          }
        );
      }

  }

  onLogin(
    loginEmail:HTMLInputElement,
    loginPassword:HTMLInputElement
    ){
    let email = loginEmail.value;
    let password = loginPassword.value;

    if(this,this.isNotEmpty(email) && this.isNotEmpty(password)){
      this.firebasetsAuth.signInWith(
        {
          email: email,
          password: password,
          onComplete: (uc) => {
            // alert("Logged In")
            this.bottomSheetRef.dismiss();
            

            
            
          
        },
          onFail: (err) => {
            alert(err);
        }
        }
      )
    }
  }

  onRegisterClick(
    
    registerEmail:HTMLInputElement,
    registerPassword:HTMLInputElement,
    registerConfirmPassword:HTMLInputElement
    
  ){
    let email = registerEmail.value;
    let password = registerPassword.value;
    let confirmpassword = registerConfirmPassword.value;
    
    if(
      this.isNotEmpty(email) &&
      this.isNotEmpty(password) &&
      this.isNotEmpty(confirmpassword) &&
      this.isAMatch(password, confirmpassword)
    ){
      this.firebasetsAuth.createAccountWith(
        {
          email: email,
          password: password,
          onComplete: (uc) => {
            // alert("Account Created")
            this.bottomSheetRef.dismiss();
            registerEmail.value = "";
            registerPassword.value = "";
            registerConfirmPassword.value = "";
          },
          onFail: (err) => {
            alert("Failed to create the account.")
          }
        }
      );
    }

  }

  isNotEmpty(text: string){
    return text != null && text.length > 0;
  }

  isAMatch(text: string, comparedWith:string){
    return text ==  comparedWith;
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onForgotPasswordClick(){
    this.state = AuthenticatorCompState.FORGOT_PASSWORD;
  }
  
  onCreateAccountClick(){
    this.state = AuthenticatorCompState.REGISTER;
  }
  
  onLoginClick(){
    this.state = AuthenticatorCompState.LOGIN;
  }

  isLoginState(){
    return this.state == AuthenticatorCompState.LOGIN;
  }
  isRegisterState(){
    return this.state == AuthenticatorCompState.REGISTER;
  }
  isForgotPasswordState(){
    return this.state == AuthenticatorCompState.FORGOT_PASSWORD;
  }

  getStateText(){
    switch(this.state){
    case AuthenticatorCompState.LOGIN:
    return "Login";
    case AuthenticatorCompState.REGISTER:
    return "Register";
    case AuthenticatorCompState.FORGOT_PASSWORD:
    return "Forgot Password";
    }}

  

}

export enum AuthenticatorCompState {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD}
