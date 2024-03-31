import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirebaseTSFirestore } from 'firebasets/firebasetsFirestore/firebaseTSFirestore';
import { FirebaseTSStorage } from 'firebasets/firebasetsStorage/firebaseTSStorage';
import { FirebaseTSApp } from 'firebasets/firebasetsApp/firebaseTSApp';
import { FirebaseTSAuth } from 'firebasets/FirebaseTSAuth/firebaseTSAuth';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  selectedImageFile!: File;
  auth = new FirebaseTSAuth();
  firestore = new FirebaseTSFirestore();
  storage = new FirebaseTSStorage();
  router: any;

  constructor() {
    
  }

 ngOnInit(): void{
 }

 onPostClick(commentInput: HTMLTextAreaElement) {
   
  let comment = commentInput.value;
  let postData = this.firestore.genDocId();

  this.storage.upload(
     {
       uploadName: "upload Image Post",
       path: ["Posts", postData, "image"],
       data: {
         data: this.selectedImageFile
       },
       
       onComplete: (downloadUrl) => {

        const currentUser = this.auth?.getAuth().currentUser
        if (currentUser){
          this.firestore.create(
          {
            path: ["Posts", postData],
            data: {
              comment: comment,
              creatorId: currentUser.uid,
              imageUrl: downloadUrl,
              timestamp: FirebaseTSApp.getFirestoreTimestamp()
            },
            onComplete: (docId) => {
              this.router.navigate(['profile']);
              
            },
            onFail: (err) => {
              alert(err);
            }
          });
        }
      },
      onFail: (err) => {
        alert(err);
      }
       
     }
   );
}

uploadPost(comment: string){

  const currentUser = this.auth?.getAuth().currentUser
  if (currentUser){
    this.firestore.create(
    {
      path: ["Posts"],
      data: {
        comment: comment,
        creatorId: currentUser.uid,
        timestamp: FirebaseTSApp.getFirestoreTimestamp()
      },
      onComplete: (docId) => {
        alert("upload text success!");
        window.location.reload();
      },
      onFail: (err) => {
        alert(err);
      }
    })
  };
}



  onPhotoSelected(photoSelector: HTMLInputElement) {

    this.selectedImageFile = photoSelector.files![0];

    if(!this.selectedImageFile) return; 

    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.selectedImageFile);

    fileReader.addEventListener(
      "loadend", 
      ev => {
        let readableString = fileReader.result!.toString();
        let postPreviewImage = <HTMLImageElement>document.getElementById("post-preview-image");
      
        if (readableString) {
          postPreviewImage.src = readableString;
        }
    });
  }
}
