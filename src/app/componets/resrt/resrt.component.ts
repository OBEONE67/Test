import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/FirebaseTSAuth/firebaseTSAuth';

@Component({
  selector: 'app-resrt',
  templateUrl: './resrt.component.html',
  styleUrl: './resrt.component.css'
})
export class ResrtComponent implements OnInit{

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  firebasetsAuth: FirebaseTSAuth;
  bottomSheetRef: any;


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
            email: email,
            onComplete: (err) => {
              alert(`Reste email sent to ${email}`);
              this.router.navigate(['login']);
              
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

  toSignup(){
    this.router.navigate(['signup']);
  }

  toLogin(){
    this.router.navigate(['login']);
  }

  toReset(){
    this.router.navigate(['resrt']);
  }
      
}
