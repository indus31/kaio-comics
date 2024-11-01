import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/core/services/storage.service';
import { UsersService } from 'src/app/core/services/users/users.service';


@Component({
  selector: 'app-update-profile-picture',
  templateUrl: './update-profile-picture.component.html',
  styleUrls: ['./update-profile-picture.component.scss'],
})
export class UpdateProfilePictureComponent  implements OnInit {
  profileForm!: FormGroup;
  
  constructor(private modalCtrl: ModalController, private fb: FormBuilder,
    private usersService: UsersService,
    private storageService: StorageService) {}

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
  onFileChange(event:Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      const file = target.files[0];
      if (file) {
        this.profileForm.get('profilePicture')!.setValue(file);
      }
    }
  }

  onSubmit() {
    const formData = new FormData();
  formData.append('profilePicture', this.profileForm.get('profilePicture')!.value);

  const userId = this.storageService.retrieve('session');
  this.usersService.findOneBy(userId).subscribe(
    response => {
      console.log('Profile picture updated successfully', response);
      // Save the image to the assets directory
      const file = this.profileForm.get('profilePicture')!.value;
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const imageUrl = event.target.result;
        const fileName = `${userId}_front_picture.${file.type.split('/')[1]}`;
        const filePath = `assets/users/users_front_picture/${fileName}`;
        // Save the image to the assets directory
        // You can use a service or a library to save the image to the file system
        // For example, you can use the FileSaver library to save the image as a blob
        //saveAs(imageUrl, fileName);
        // Update the frontPicture field of the user object
        this.usersService.findOneBy(userId).subscribe(
          user => {
            user.frontPicture = filePath;
            this.usersService.updateUser(user).subscribe(
              response => {
                console.log('User updated successfully', response);
              },
              error => {
                console.error('Error updating user', error);
              }
            );
          },
          error => {
            console.error('Error retrieving user', error);
          }
        );
      };
      reader.readAsDataURL(file);
    },
    error => {
      console.error('Error updating profile picture', error);
    }
  );
  }

}


