import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componets/login/login.component';
import { SignupComponent } from './componets/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { ProfileComponent } from './profile/profile.component';
import { ResrtComponent } from './componets/resrt/resrt.component';


const routes: Routes = [

  {
    path: '' , component: HomeComponent
  },

  {
    path:'login' , component: LoginComponent
  },

  {
    path:'signup' , component: SignupComponent
  },
  
  {
    path:'resrt' , component: ResrtComponent
  },
  
  {
    path:'home' , component: HomeComponent
  },

  {
    path:'postfeed' , component: PostFeedComponent
  },

  {
    path:'profile' , component: ProfileComponent
  },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
