import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { LoginComponent } from '../../componets/login/login.component';
import { MatBottomSheet,MatBottomSheetModule,MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { TestComponent } from '../../test/test.component';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private loginSheet: MatBottomSheet ,private router: Router){
    
  }

  ngOnInit(): void {
      
  }

  toLogin(){
    this.router.navigate(['login']);
  }

  toGetStarted(){
    this.loginSheet.open(TestComponent);

  }

}
