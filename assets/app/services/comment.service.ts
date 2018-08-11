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
      const body = JSON.stringify(comment);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.post('http://app-warsha-1.herokuapp.com/post/' + id +'/comment'+ token, body, {headers: headers})
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
        return this.http.get('http://app-warsha-1.herokuapp.com/comment/' + id +token )
            .map((response: Response) => {
              const comments = response.json().obj;
              let  Comments: Comment[] = [];
              for (let comment of comments) {
                console.log(comment);
                   Comments.push(new Comment(
                      comment.description,
                      comment.time,
                      comment.user.name,
                      comment.userImage,
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
      return this.http.delete('http://app-warsha-1.herokuapp.com/comment/' + id + token)
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
    }
}
