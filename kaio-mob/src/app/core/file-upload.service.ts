import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private apiUrl = 'http://localhost:3000/profile-picture'; 

  constructor(private http: HttpClient) { }

  uploadFile(file: File, extension: string, userId: string): Observable<any> {
    const formData: FormData = new FormData();
    console.log('juste avant le append')
    formData.append('file', file, file.name);
    formData.append('extension', extension);
    formData.append('userId', userId);

    return this.http.post(this.apiUrl+'/upload', formData);
  }
  getProfilePictureByUserId(userId: string): Observable<any> {
    console.log('sending request for image')
    return this.http.get(`${this.apiUrl}/provide/${userId}`);
  }
}