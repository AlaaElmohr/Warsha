import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommentService } from '../../services/comment.service';
import { Router,ActivatedRoute  } from "@angular/router";
import { Post } from "../../models/post.model";
import { Comment } from "../../models/comment.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss']
})
export class BlogPostComponent implements OnInit {
  post:Post;
  id;
  userId=localStorage.getItem('userId');
 constructor(private commentService:CommentService,private route:ActivatedRoute,private postService:PostService){}
 ngOnInit(){
   this.route.params.subscribe(params => {
        this.id = params['id'];
        this.postService.getPostById(this.id).subscribe(
              (post: Post) => {
                    this.post= post;
                    console.log(this.post.comments)
              }
          );
     });
 }
 onDelete(comment) {
   this.post.comments.splice(this.post.comments.indexOf(comment),1);
    this.commentService.deleteComment(comment._id)
        .subscribe(
            result => console.log(result)
        );
}
 onSubmit(form:NgForm){
    const comment=new Comment(form.value.description,new Date(),form.value.name,form.value.email);
    console.log("comment"+comment);
      this.post.comments.push(comment);
    this.commentService.addComment(comment,this.id)

       .subscribe(
           data => console.log(data),
          error => console.error(error)
       );
 form.reset();
 }

}
