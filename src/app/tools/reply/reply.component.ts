import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FirebaseTSFirestore, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { PostData, ProfileComponent } from '../../profile/profile.component';



@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrl: './reply.component.css'
})
export class ReplyComponent implements OnInit {
  @Input() postData!: PostData;
  comments: Comment [] = [];

  firestore = new FirebaseTSFirestore();

  constructor(@Inject(MAT_DIALOG_DATA) private data:string, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getComments()
  }
  
  getComments(){
    this.firestore.listenToCollection(
      {
        name: "Post Comments",
        path: ["Posts", this.data, "PostComments"],
        where: [new OrderBy("timestamp", "asc")],
        onUpdate: (result) => {
          // this.comments = []; // เริ่มต้นโดยการล้างค่า comments เดิม
          result.docChanges().forEach(
            PostCommentDoc => {
              if(PostCommentDoc.type == "added"){
                this.comments.unshift(<Comment>PostCommentDoc.doc.data())
              }
            }
          )
        }
      }
    );
  }

  onSendClick(commentInput: HTMLInputElement) {
    if (!(commentInput.value.length > 0)) return;
  
    const userId = ProfileComponent.getUserDocument()?.userId || "";
    const username = ProfileComponent.getUserDocument()?.username || "";
    const timestamp = FirebaseTSApp.getFirestoreTimestamp(); // Assuming this returns a valid Firestore timestamp
  
    this.firestore.create({
      path: ["Posts", this.data, "PostComments"],
      data: {
        comment: commentInput.value,
        creatorId: userId,
        creatorName: username,
        timestamp: timestamp
      },
      onComplete: (docId) => {
        commentInput.value = "";
      },
      onFail: (err) => {
        console.log(err);
      },
    });
  }
}

export interface Comment {
  creatorId: string;
  creatorName: string;
  comment: string;
  timestamp: firebase.default.firestore.Timestamp;
}

