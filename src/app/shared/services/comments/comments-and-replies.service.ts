import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsAndRepliesService {

  constructor(private _HttpClient:HttpClient) { }

  GetPostComments(postID:string):Observable<any>{
    return this._HttpClient.get(`${environment.baseURL}/posts/${postID}/comments?page=1&limit=10`)
  }

  LikeComment(postID:string , commentID:string):Observable<any>{
    return this._HttpClient.put(`${environment.baseURL}/posts/${postID}/comments/${commentID}/like`,{})
  }

  ReplyOnComment(formData:object,postID:string,commentID:string):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}/posts/${postID}/comments/${commentID}/replies`,formData)
  }

}
