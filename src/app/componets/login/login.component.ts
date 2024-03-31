import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/FirebaseTSAuth/firebaseTSAuth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  firebasetsAuth: FirebaseTSAuth;


  constructor(private router: Router){
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
            email: "",
            onComplete: (err) => {
              alert('Reste email sent to ${email}');
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

    this.firebasetsAuth.signInWith(
      {
        email: email,
        password: password,
        onComplete: (uc) => {
          alert("Logged In")
          this.router.navigate(['profile'])
        },
          onFail: (err) => {
          alert(err);
        }
      }
    )
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

  toSignup(){
    this.router.navigate(['signup']);
  }

  toReset(){
    this.router.navigate(['resrt']);
  }

  toHome(){
    this.router.navigate(['home']);
  }

}
