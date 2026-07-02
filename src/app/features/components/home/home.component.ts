import { Component, inject } from '@angular/core';
import { PostsService } from '../../../shared/services/posts/posts.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPost } from '../../../core/interfaces/post/ipost';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  private _PostsService = inject(PostsService)
  private _Router = inject(Router)
  private _ToastrService = inject(ToastrService)
  posts!:IPost[]

  ngOnInit(){
    this._PostsService.GetAllPosts().subscribe({
      next:(res)=>{
        this.posts = res.data.posts;
        console.log(res);
      }
    })
  }

}
