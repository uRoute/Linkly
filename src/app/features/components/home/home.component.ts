import { Component, computed, ElementRef, inject, Signal, ViewChild } from '@angular/core';
import { PostsService } from '../../../shared/services/posts/posts.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPost } from '../../../core/interfaces/post/ipost';
import { DatePipe } from '@angular/common';
import { AuthenticationService } from '../../../shared/services/authentication/authentication.service';
import { ILogedUser } from '../../../core/interfaces/loggedUser/iloged-user';
import { CookieService } from 'ngx-cookie-service';
import { ILike } from '../../../core/interfaces/likes/ilike';
import { IUser } from '../../../core/interfaces/userDetails/iuser';
import { CommentsAndRepliesService } from '../../../shared/services/comments/comments-and-replies.service';
import { IComment } from '../../../core/interfaces/comment/icomment';

@Component({
  selector: 'app-home',
  imports: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private _PostsService = inject(PostsService)
  private _AuthenticationService = inject(AuthenticationService)
  private _CommentsAndRepliesService = inject(CommentsAndRepliesService)
  private _Router = inject(Router)
  private _ToastrService = inject(ToastrService)
  private _CookieService = inject(CookieService)

  @ViewChild('commentModal') commentModal!:ElementRef
  posts:IPost[] = []
  postLikes!:ILike[];
  postComments!:IComment[]
  userDetails!:IUser
  userInfo:Signal<ILogedUser>  = computed(() => this._AuthenticationService.userInfo() );
  ngOnInit(){
    this._PostsService.GetAllPosts().subscribe({
      next:(res)=>{
        this.posts = res.data.posts;
        console.log(res);
      }
    })

    if(this._CookieService.check('userToken')){
      this._AuthenticationService.decodeToken(this._CookieService.get('userToken'))
      console.log(this.userInfo());
      this.userDetails = JSON.parse(localStorage.getItem('userDetails')!)

    }else{
      console.log('moshkla');
      
    }  
    
  }

  ngAfterViewInit(){
    console.log(this.commentModal);
  }
  
  LikePost(postID:string){
    this._PostsService.LikesOnPost(postID).subscribe({
      next:(res)=>{
        this.ngOnInit()
      },
      error:(err)=>{
        this._ToastrService.error(err.error.message)
      }
    })    
  }

  BookmarkPost(postID:string){
    this._PostsService.BookmarkPosts(postID).subscribe({
      next:(res)=>{
        // this._ToastrService.success(res.message)
        this.ngOnInit()
      },
      error:(err)=>{
        this._ToastrService.error(err.error.message)
      }
    })
  }

  PostLikes(postId:string){
    this._PostsService.GetPostLikes(postId).subscribe({
      next:(res)=>{
        console.log(res);
        this.postLikes = res.data.likes
      }
    })
  }

  SharePost(){
    
  }

  commentOverLay(){
    
  }

  CommentsOfPost(postID:string){
    this.postComments = []
    this._CommentsAndRepliesService.GetPostComments(postID).subscribe({
      next:(res)=>{
        console.log(res);
        this.postComments = res.data.comments
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }


}
