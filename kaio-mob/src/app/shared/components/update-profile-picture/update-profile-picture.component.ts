import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { take } from 'rxjs';
import { FileUploadService } from 'src/app/core/file-upload.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UsersService } from 'src/app/core/services/users/users.service';


@Component({
  selector: 'app-update-profile-picture',
  templateUrl: './update-profile-picture.component.html',
  styleUrls: ['./update-profile-picture.component.scss'],
})
export class UpdateProfilePictureComponent  implements OnInit {
  profileForm!: FormGroup;
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

  ngOnInit():void {
    this.profileForm = this.fb.group({
      profilePicture: ['']
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    console.log('début du onSubmit')
    if (this.selectedFile) {
      console.log(this.selectedFile)
      console.log(this.storageService.retrieve('session'));
      const userId:string= this.storageService.retrieve('session');
      const extension:string = this.selectedFile.name.split('.').pop() || '';

      this.fileUploadService.uploadFile(this.selectedFile, extension, userId)
        .pipe(take(1))
        .subscribe({
          next: response => {
            console.log('File uploaded successfully', response);
          },
          error: error => {
            console.error('Error uploading file', error);
          }
        });
    }
  }

  

}


