import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostPictureService {
  private apiUrl = 'http://localhost:3000/post-picture'; 

  constructor(private http: HttpClient) { }
  uploadPostFile(file: File, extension: string, postId: string): Observable<any> {
    const formData: FormData = new FormData();
    console.log('posting picture file.....')
    if(!file){
      console.log('file is empty')
    }
    formData.append('file', file, file.name);
    formData.append('extension', extension);
    formData.append('postId', postId);
    console.log('upload postPicture complete')
    return this.http.post(this.apiUrl+'/upload', formData);
  }
  getPostPictureByPostId(postId: string): Observable<any> {
    console.log('sending request for image')
    return this.http.get(`${this.apiUrl}/provide/${postId}`);
  }
  createPicture(postId:string):Observable<any>{
    console.log('request for creating document')
    console.log('id received : '+ postId)
    console.log('request on : '+`${this.apiUrl}/create/${postId}`)
    return this.http.post(`${this.apiUrl}/create/${postId}`,{})
  }

}
