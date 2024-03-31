import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseTSAuth } from 'firebasets/FirebaseTSAuth/firebaseTSAuth';
import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  posts: PostData [] = [];
  @Input() postData!: PostData;
  @Input() show!: boolean;
  firestore = new FirebaseTSFirestore();
  private static userDocument: UserDocument | null = null;



  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.firestore.getCollection(
      {
        path: ["Posts"],
        where: [
          new OrderBy("timestamp", "desc"),
          new Limit(10)
        ],
        onComplete: (result) => {
          result.docs.forEach(
                 doc => {
                   let post = <PostData>doc.data();
                   post.postId = doc.id;
                   this.posts.push(post);
                 }
         );
        },
        onFail: err => {

        }
      }
    );
  }

  auth = new FirebaseTSAuth();

  constructor(private router: Router){
    this.auth.listenToSignInStateChanges(
      user => {
        this.auth.checkSignInState(
          {
            whenSignedIn: user => {
              this.getUserProfile();
            },
            whenSignedOut: user => {
              ProfileComponent.userDocument = null;
            },
            whenChanged: user => {

            }
          }
        );
      }
    );

  }

  onLogoutClick(){
    alert("Logout")
    this.router.navigate(['']);
  }

  loggedIn(){
    return this.auth.isSignedIn();
  }

  toLogin(){
    this.router.navigate(['login']);
  }

  toHome(){
    this.router.navigate(['home']);
  }

  public static getUserDocument(){
    return ProfileComponent.userDocument;
  }
  
  getUsername(){
      return ProfileComponent.userDocument?.username;

  }
  
  getUserProfile(){
    this.firestore.listenToDocument(
    {
      name: "Getting Document",
      path: [ "Users", this.auth?.getAuth()?.currentUser?.uid || '{}'],
      onUpdate: (result) => {
        const userData = <UserDocument>result.data();
        ProfileComponent.userDocument = {
          ...userData,       
        };
      } 
    })
  }
  
  getProfile(){
    return ProfileComponent.userDocument?.username;
  }

}

export interface UserDocument {
  username: string;
  userId: string;
}


export interface PostData {
  postId: string;
  comment: string;
  creatorId: string;
  imageUrl?: string;
}

