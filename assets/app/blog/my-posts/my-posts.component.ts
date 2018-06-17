import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from "../../models/post.model";
import {HeaderService} from '../../services/header.service'

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {
  p: number = 1;
  collection: any[] = [1,2,4,5,6,7,7,];
  posts:Post[]=[];
  userId=localStorage.getItem('userId');
 constructor(private postService:PostService,private headerService:HeaderService){}
 ngOnInit(){
     this.headerService.addText('Blog / My Posts');
    this.postService.getPosts().subscribe(
          (posts: Post[]) => {
            for(let post of posts){
            if(post.userId._id === this.userId){
              this.posts.push(post);
            }
          }
      );
 }
 onDelete(post) {
   this.posts.splice(this.posts.indexOf(post),1);
     this.postService.deletePost(post)
         .subscribe(
             result => console.log(result)
         );
 }

}
