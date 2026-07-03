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

}
