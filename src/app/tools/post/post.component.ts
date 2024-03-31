import { Component, Input, OnInit } from '@angular/core';
import { PostData, ProfileComponent} from '../../profile/profile.component';
import { FirebaseTSAuth } from 'firebasets/FirebaseTSAuth/firebaseTSAuth';
import { FirebaseTSFirestore, Limit, OrderBy } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { MatDialog } from '@angular/material/dialog';
import { ReplyComponent } from '../reply/reply.component';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent implements OnInit{
  @Input() postData!: PostData;
  firestore = new FirebaseTSFirestore();
  creatorDescription!: string;
  creatorUsername: string | undefined;
  creatorName: string | undefined;
  isLiked: boolean = false;
  likeCount: number = 0;
  

  constructor(private dialog: MatDialog){
    
  }
  ngOnInit(): void {
    this.getCreatorInfo();
  }

  getCreatorInfo(){
    this.firestore.getDocument(
      {
        path: ["Users", this.postData!.creatorId],
        onComplete: result => {
            let userDocument = result.data();
            this.creatorUsername = userDocument!['username'];
        }
      }
    );
  }

  toggleLike() {
    // สลับสถานะของการกดใจ
    this.isLiked = !this.isLiked;

    // อัปเดตจำนวนการกดใจในฐานข้อมูล
    if (this.isLiked) {
      this.likeCount++;
      // ส่วนนี้คุณต้องอัปเดตข้อมูลใน Firestore ตามความเหมาะสม
    } else {
      this.likeCount--;
      // ส่วนนี้คุณต้องอัปเดตข้อมูลใน Firestore ตามความเหมาะสม
    }
  }



  onReplyClick(){
    this.dialog.open(ReplyComponent, {data: this.postData!.postId});
    console.log(this.postData);
    console.log(this.postData.postId);
  }

}

export interface Comment {
  creatorId: string;
  creatorUsername: string;
  comment: string
  timestamp: firebase.default.firestore.Timestamp
  commentCount: number;
  likeCount: number;
}






