import { AfterViewInit, Component, computed, ElementRef, inject, Signal, ViewChild } from '@angular/core';
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
import { FormsModule } from '@angular/forms'; 
import { IReply } from '../../../core/interfaces/replies/ireply';
import { ModalComponent } from "../../../shared/components/modal/modal.component";
@Component({
  selector: 'app-home',
  imports: [DatePipe, FormsModule, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit{

  @ViewChild('c_Modal') commentModal!:ElementRef<HTMLElement>
  private _PostsService = inject(PostsService)
  private _AuthenticationService = inject(AuthenticationService)
  private _CommentsAndRepliesService = inject(CommentsAndRepliesService)
  private _Router = inject(Router)
  private _ToastrService = inject(ToastrService)
  private _CookieService = inject(CookieService)
  holdPostId:string = ''
  posts:IPost[] = []
  postLikes!:ILike[];
  postComments!:IComment[]
  userDetails!:IUser
  ImgSrc!:File
  replyConent:string = ''
  commentConent:string = ''
  commentReplies!:IReply[]
  userInfo:Signal<ILogedUser>  = computed(() => this._AuthenticationService.userInfo() );
  constructor(){
  }



  ngOnInit(){
    if(this._CookieService.check('userToken')){
      this._AuthenticationService.decodeToken(this._CookieService.get('userToken'))
      console.log(this.userInfo());
      this.userDetails = JSON.parse(localStorage.getItem('userDetails')!)
    }else{
      console.log('moshkla');
    }  

    this.getAllPosts()
  }

  getAllPosts(){
    this._PostsService.GetAllPosts().subscribe({
      next:(res)=>{
        this.posts = res.data.posts;
        console.log(res);
      }
    })
  }

  ngAfterViewInit(){

    // console.log(this.commentModal.nativeElement.classList);
  }
  
  showModal(){
    this.commentModal.nativeElement.classList.remove('hidden')
  }
  closeModal(){
    this.commentModal.nativeElement.classList.add('hidden')
  }



  forHoldingPostId(posiId:string){
    this.holdPostId = posiId
  }

  LikePost(postID:string){

    this._PostsService.LikesOnPost(postID).subscribe({
      next:(res)=>{
        this.getAllPosts()
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
        this.getAllPosts()
      },
      error:(err)=>{
        this._ToastrService.error(err.error.message)
      }
    })
  }

  leaveComment(){
    let commentFormData = new FormData();
    this.ImgSrc ? commentFormData.append('image' , this.ImgSrc) : this.ImgSrc = {} as File
    console.log(this.ImgSrc); 
    commentFormData.append('content' , this.commentConent)
    
    for( let [img,content] of commentFormData.entries() ){
      console.log(img , content);
    }
    this._CommentsAndRepliesService.CreateComment(this.holdPostId,commentFormData).subscribe({
      next:(res)=>{
        console.log(res);
        this.commentConent = ''
        console.log(this.holdPostId);
        
        this.CommentsOfPost(this.holdPostId)
        this.getAllPosts()
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }

  SharePost(){
    
  }


  // post details
  PostLikes(postId:string,flag?:boolean){
    flag ? null : this.postLikes = [] 

    this._PostsService.GetPostLikes(postId).subscribe({
      next:(res)=>{
        console.log(res);
        this.postLikes = res.data.likes
      }
    })
  }
  CommentsOfPost(postID:string,flag?:boolean){
    flag ? null :this.postComments = [] 
    this._CommentsAndRepliesService.GetPostComments(postID).subscribe({
      next:(res)=>{
        console.log(res);
        this.postComments = res.data.comments
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
  likeComment(postID:string , commentId:string){
    this._CommentsAndRepliesService.LikeComment(postID,commentId).subscribe({
      next:(res)=>{
        console.log(res);
        this.CommentsOfPost(postID,true)
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }


  // Replies
  repliesOfComment(postId:string , commentID:string,flag?:boolean){
    flag ? null :this.commentReplies = [] 
    this._CommentsAndRepliesService.GetCommentReplies(postId , commentID).subscribe({
      next:(res)=>{
        this.commentReplies = res.data.replies
        console.log(this.commentReplies);
                
      }
    })
  }
  holdReplyImag(e:Event){
    console.log(e.target);
    let inputFile = (e.target) as HTMLInputElement
    if(inputFile.files && inputFile.files.length > 0){
      this.ImgSrc = inputFile.files[0];
    }
  }
  replayOnComment(commentID:string,postID:string){
    let replyFormData = new FormData()
    this.ImgSrc ? replyFormData.append('image' , this.ImgSrc) : this.ImgSrc = {} as File
    console.log(this.ImgSrc);
    
    replyFormData.append('content' , this.replyConent)
    for( let [img,content] of replyFormData.entries() ){
      console.log(img , content);
    }
    this._CommentsAndRepliesService.ReplyOnComment(replyFormData , postID , commentID).subscribe({
      next:(res)=>{
        this.replyConent = ''
        console.log(res);
      }
    })
  }
}
