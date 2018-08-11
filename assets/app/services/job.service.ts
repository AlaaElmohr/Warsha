import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Job } from "../models/job.model";
@Injectable()
export class JobService {
    constructor(private http: Http) {}
    addPost(post:Job){
      const body = JSON.stringify(post);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.post('http://app-warsha-1.herokuapp.com/job' + token, body, {headers: headers})
          .map((response: Response) => {
              const result = response.json();
          })
          .catch((error: Response) => Observable.throw(error.json()));
    }
    updateJob(id,feedback){
      const body = JSON.stringify(feedback);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.patch('http://app-warsha-1.herokuapp.com/job/' +id+ token, body, {headers: headers})
          .map((response: Response) => {
              const result = response.json();
          })
          .catch((error: Response) => Observable.throw(error.json()));
    }
    getPosts(filter) {
      const token = localStorage.getItem('token')
          ? 'token=' + localStorage.getItem('token')
          : '';
          const body = JSON.stringify(filter);
          const query='?query=' + body;
        return this.http.get('http://app-warsha-1.herokuapp.com/job' + query)
            .map((response: Response) => {
                const posts = response.json().obj[0];
                const AppCount = response.json().obj[1];
                let Jobs: Job[] = [];
                for (let post of posts) {
                    Jobs.push(new Job(
                        post.title,
                        post.description,
                        post.categories,
                         post.salary,
                         post.jobType,
                         post.skills,
                         post.deadline,
                         post.country,
                         post.city,
                         post.address,
                         post.client._id,
                         post._id,
                         post.client,
                         post.complete,
                         AppCount[posts.indexOf(post)]
                      )
                    );
                }
                return Jobs;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    getPostById(id){
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.get('http://app-warsha-1.herokuapp.com/job/' + id +token)
          .map((response: Response) => {
              const post = response.json().obj[0];
              const appCount= response.json().obj[1];
              let job: Job;
                  job=new Job(
                    post.title,
                    post.description,
                    post.categories,
                     post.salary,
                     post.jobType,
                     post.skills,
                     post.deadline,
                     post.country,
                     post.city,
                     post.address,
                     post.client._id,
                     post._id,
                     post.client,
                     post.complete,
                     appCount
                       );
              return job;
          })
          .catch((error: Response) => Observable.throw(error.json()));
    }
    deleteJob(job){
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.delete('http://app-warsha-1.herokuapp.com/job/' + job.jobId + token)
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
    }

    editPost(job,id){
      const body = JSON.stringify(job);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.patch('http://app-warsha-1.herokuapp.com/job/' + id + token, body, {headers: headers})
          .map((response: Response) => {
              const result = response.json();
          })
          .catch((error: Response) => Observable.throw(error.json()));
    }
}
