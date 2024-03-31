import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import validateForm from '../../helpers/validataform';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/FirebaseTSAuth/firebaseTSAuth';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  
  firebasetsAuth: FirebaseTSAuth;
  auth: FirebaseTSAuth;
  firestore: FirebaseTSFirestore;
  
  constructor(private router: Router){
    this.firestore = new FirebaseTSFirestore()
    this.auth = new FirebaseTSAuth();
    this.firebasetsAuth = new FirebaseTSAuth();
  }

  ngOnInit(): void {
  }

  test(){
    this.auth.createAccountWith(
      {
          email: "codeible@codeible.com",
          password: "*******",
          onComplete: (uc) => {
             alert("Signed in!");
           },
          onFail: (err) => {
             alert("Failed to Sign in...");
          }
      }
   );
  }

  onRegisterClick(
    registerUsername: HTMLInputElement,
    registerEmail: HTMLInputElement,
    registerPassword: HTMLInputElement,
    registerConfirmPassword: HTMLInputElement
  ) {
    const username = registerUsername.value;
    const email = registerEmail.value;
    const password = registerPassword.value;
    const confirmPassword = registerConfirmPassword.value;

    console.log("pass"+ password);
    console.log("checkPass"+ confirmPassword);
  
      if (this.isAMatch(password, confirmPassword)) {

        this.auth.createAccountWith({

          email: email,
          password: password,

          onComplete: (authResult) => {

            const user = authResult.user;

            if (user) {

              this.firestore.create({
                path: ["Users", user.uid],
                data: { 
                  username: username,
                  email: email,
                },

                onComplete: (docId) => {
                  alert("Registered Successfully");
                  this.router.navigate(['login']);
                },

                onFail: (err) => {
                    alert("cant create user : " + err);
                    console.log(err);
                }

              })

            } else {
                alert("null.");
            }

          },
          onFail: (err) => {
            alert(err);
            console.log(err);
          }

        })

      } else {
        alert("Passwords do not match.");
    }

  }
  
  

  
  // isNotEmpty(text: string){
  //   return text != null && text.length > 0;
  // }

  isAMatch(text: string, comparedWith: string) {
    return text === comparedWith; // Use strict comparison
  }


  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  toLogin(){
    this.router.navigate(['login']);
  }

  toReset(){
    this.router.navigate(['resrt']);
  }

  toHome(){
    this.router.navigate(['home']);
  }


}
