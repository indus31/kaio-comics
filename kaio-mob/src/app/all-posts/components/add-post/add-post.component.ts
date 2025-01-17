import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { catchError, of, switchMap } from 'rxjs';
import { FileUploadService } from 'src/app/core/file-upload.service';
import { PostCategory, PostType } from 'src/app/core/model/post/postType';
import { UserType } from 'src/app/core/model/user.type';
import { PostService } from 'src/app/core/services/post/post.service';
import { PostPictureService } from 'src/app/core/services/post/postpicture.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UsersService } from 'src/app/core/services/users/users.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;
  postCategories = PostCategory;
  selectedFile?: File;
  previewPost: PostType | null = null;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private usersService: UsersService,
    private storageService: StorageService,
    private fileUploadService: FileUploadService,
    private postService: PostService,
    private postPictureService: PostPictureService
  ) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss("hello", 'confirm');
  }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: [''],
      content: ['', Validators.required],
      media: [''],
    });
    // Écouter les changements dans le formulaire
    this.postForm.valueChanges.subscribe(formValue => {
      this.updatePreviewPost(formValue);
    });
  }
  updatePreviewPost(formValue: any): void {
    const userId = this.storageService.retrieve('session');
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }

    this.usersService.findOneBy(userId).subscribe(author => {
      this.previewPost = {
        ...formValue,
        postedAt: new Date(),
        author: author,
        category: PostCategory.news,
        likes: [],
        comments: []
      };
    });
  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const mediaUrl = e.target.result;
        this.postForm.patchValue({ media: mediaUrl });
        this.updatePreviewPost(this.postForm.value); // Mettre à jour la prévisualisation
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    console.log('begin submit');
    const userId = this.storageService.retrieve('session');

    if (!userId) {
      console.error('User ID is undefined');
      return;
    }

    // Récupérer l'utilisateur complet
    this.usersService.findOneBy(userId).pipe(
      switchMap((author: UserType) => {
        const postData: PostType = {
          ...this.postForm.value,
          postedAt: new Date(),
          authorId: author._id, // Utilisez authorId au lieu de author
          category: PostCategory.news,
          likes: [], 
          comments: [],
          media: '' 
        };

        console.log('Post data to be sent:', postData); // 1er stop

        // Créer le post
        return this.postService.createPost(postData).pipe(
          switchMap((createdPost: PostType) => {
            const postId = createdPost.id;

            // Vérifier si un fichier est sélectionné
            if (this.selectedFile) {
              const file: File = this.selectedFile;
              if (!file.name) {
                console.error('File name is undefined');
                return of(createdPost);
              }
              const extension = file.name.split('.').pop();
              console.log("extension =  " + extension + " postId =  " + postId);

              if (postId && extension) {
                console.log('juste avant uploadfile : ' + postId + extension);
                // Uploader le fichier et mettre à jour le post
                return this.postPictureService.uploadPostFile(file, extension, postId).pipe(
                  switchMap(response => {
                    console.log('File uploaded successfully', response);
                    const mediaUrl = `http://localhost:3000/post-picture/provide/${postId}`;
                    createdPost.media = mediaUrl;
                    return this.postService.updatePost(createdPost, postId).pipe(
                      switchMap(updatedPost => {
                        console.log('Post updated with media URL', updatedPost);
                        return of(updatedPost);
                      }),
                      catchError(error => {
                        console.error('Error updating post:', error);
                        return of(createdPost);
                      })
                    );
                  }),
                  catchError(error => {
                    console.error('Error uploading file:', error);
                    return of(createdPost);
                  })
                );
              } else {
                console.error('Post ID or file extension is undefined');
                return of(createdPost);
              }
            } else {
              // Si aucun fichier n'est sélectionné, créer le post sans mettre à jour la propriété media
              return of(createdPost);
            }
          }),
          catchError(error => {
            console.error('Error creating post:', error);
            return of(null);
          })
        );
      }),
      catchError(error => {
        console.error('Error retrieving user:', error);
        return of(null);
      })
    ).subscribe({
      next: (response) => {
        if (response) {
          console.log('Post created successfully');
          this.confirm();
        }
      },
      error: (error) => {
        console.error('Error in the process:', error);
      }
    });
  }
}
