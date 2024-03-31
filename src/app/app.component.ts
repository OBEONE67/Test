import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/FirebaseTSAuth/firebaseTSAuth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Test';
  auth = new FirebaseTSAuth();

  constructor(private router: Router){
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {
              
            },
            whenSignedOut: user => {

            }
          }
        );
      }
    );

  }

  loggedIn(){
    return this.auth.isSignedIn
  }

  toLogin(){
    this.router.navigate(['login']);
  }

  toHome(){
    this.router.navigate(['home']);
  }
}


