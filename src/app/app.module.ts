import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule, Routes } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { environment } from '../environments/environment.development';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PostFeedComponent } from './pages/post-feed/post-feed.component';
import { TestComponent } from './test/test.component';
import { CreatePostComponent } from './tools/create-post/create-post.component';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { PostComponent } from './tools/post/post.component';
import { ReplyComponent } from './tools/reply/reply.component';
import { UserLikesComponent } from './user-likes/user-likes.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    PostFeedComponent,
    ProfileComponent,
    CreatePostComponent,
    PostComponent,
    ReplyComponent,
    UserLikesComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule
  
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    FirebaseTSApp.init(environment.firebaseConfig);
    
  }
  
}
