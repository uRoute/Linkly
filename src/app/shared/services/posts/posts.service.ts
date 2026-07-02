import { environment } from './../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private _HttpClient:HttpClient) { }

  GetAllPosts():Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/posts`)
  }
  LikesOnPost(postID:string):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}/posts/${postID}/like`,'')
  }
  BookmarkPosts(postID:string):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}/posts/${postID}/bookmark`,'')
  }

}
