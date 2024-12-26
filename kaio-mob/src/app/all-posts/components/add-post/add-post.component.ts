import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { FileUploadService } from 'src/app/core/file-upload.service';
import { PostCategory, PostType } from 'src/app/core/model/post/postType';
import { UserType } from 'src/app/core/model/user.type';
import { StorageService } from 'src/app/core/services/storage.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent  implements OnInit {

  postForm!: FormGroup;
  postCategories = PostCategory;
  selectedFile?: File ;
  
  constructor(private modalCtrl: ModalController, private fb: FormBuilder,
    private usersService: UsersService,
    private storageService: StorageService,
  private fileUploadService :FileUploadService) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss("hello", 'confirm');
  }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      media: [''],
    });
  }
  
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const post: PostType = {
        ...this.postForm.value,
        postedAt: new Date()
      };
      // Logique pour soumettre le post, par exemple, appeler un service
      console.log(post);
    }
  }

}
