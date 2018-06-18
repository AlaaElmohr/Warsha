import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Post }  from "../models/post.model";
import { Comment }  from "../models/comment.model";

@Injectable()
export class CommentService{
    constructor(private http: Http) {}
    addComment(comment:Comment,id){
        console.log(comment);
      const body = JSON.stringify(comment);
      console.log(body);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.post('https://app-warsha.herokuapp.com/post/' + id +'/comment'+ token, body, {headers: headers})
          .map((response: Response) => {
              const result = response.json();
          })
          .catch((error: Response) => Observable.throw(error.json()));
    }
    getCommentById(id) {
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      //    const userId = localStorage.getItem('userId');
        return this.http.get('https://app-warsha.herokuapp.com/comment/' + id +token )
            .map((response: Response) => {
              const comments = response.json().obj;
              console.log("comments" + comments);
              let  Comments: Comment[] = [];
              for (let comment of comments) {
                   Comments.push(new Comment(
                      comment.description,
                      comment.time,
                      comment.user.name,
                      comment._id,
                      comment.post
                      )
                  );
              }
              return Comments;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteComment(id){
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
          console.log(id);
      return this.http.delete('https://app-warsha.herokuapp.com/comment/' + id + token)
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
    }
}
