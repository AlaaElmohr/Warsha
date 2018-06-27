import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Post }  from "../models/post.model";
@Injectable()
export class PostService{
    constructor(private http: Http) {}
    addPost(post:Post){
        console.log(post);
      const body = JSON.stringify(post);
      console.log(body);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.post('https://warsha-2.herokuapp.com/post' + token, body, {headers: headers})
          .map((response: Response) => {
              const result = response.json();
          })
          .catch((error: Response) => Observable.throw(error.json()));
    }
    getPostById(id) {
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
          const userId = localStorage.getItem('userId');
        return this.http.get('https://warsha-2.herokuapp.com/post/' + id +token )
            .map((response: Response) => {
                const post= response.json().obj;
                console.log(post);
                     let recievedPost=new Post(
                      post.title,
                      post.description,
                      post.categories,
                      post.tags,
                       post.time,
                       post._id,
                       post.user,
                       post.comments,
                       post.user.name
                    );
                return recievedPost;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    getPosts() {
        return this.http.get('https://warsha-2.herokuapp.com/post')
            .map((response: Response) => {
                const posts = response.json().obj[0];
                const CommentCount= response.json().obj[1];
                let  Posts: Post[] = [];
                for (let post of posts) {
                  console.log(post);
                    Posts.push(new Post(
                        post.title,
                        post.description,
                        post.categories,
                        post.tags,
                        post.time,
                        post._id,
                        post.user,
                        post.comments,
                        post.user.name,
                        CommentCount[posts.indexOf(post)]
                      )
                    );
                }
                return Posts;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    deletePost(id){
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
          console.log(id);
      return this.http.delete('https://warsha-2.herokuapp.com/post/' + id + token)
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
    }
    updatePost(post,id){
      console.log(post);
      const body = JSON.stringify(post);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
          console.log(id);
      return this.http.patch('https://warsha-2.herokuapp.com/post/' + id + token, body, {headers: headers})
          .map((response: Response) => {
              const result = response.json();
          })
          .catch((error: Response) => Observable.throw(error.json()));
    }
}
