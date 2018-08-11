import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from "../../models/post.model";

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.scss']
})
export class BlogPostsComponent implements OnInit {
  p: number = 1;
  collection: any[] = [1,2,4,5,6,7,7,];
  posts:Post[]=[];
  userId=localStorage.getItem('userId');
  postImage=[];
 constructor(private postService:PostService){ }
 ngOnInit(){
    this.postService.getPosts().subscribe(
          (posts: Post[]) => {
            for(let post of posts){
              const image="/assets/uploads/"+post.postImage;
              this.postImage.push(image);
              this.posts.push(post);
          }
          }
      );
 }

}
