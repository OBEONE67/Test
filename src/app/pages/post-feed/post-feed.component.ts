import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../../tools/create-post/create-post.component';
import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';

@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.css'
})
export class PostFeedComponent implements OnInit{
  @Input() postData!: PostData;
  firestore = new FirebaseTSFirestore();
  posts: PostData [] = [];


  constructor(private dialog: MatDialog){

  }
  ngOnInit(): void {
    this.getPosts();
  }

  

  onCreatePostClick(){
    this.dialog.open(CreatePostComponent);
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

  

}

export interface PostData {
  postId: string;
  comment: string;
  creatorId: string;
  imageUrl?: string;

}
