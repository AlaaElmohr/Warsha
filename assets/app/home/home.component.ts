import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../services/header.service';
import { PostService } from '../services/post.service';
import { Post } from "../models/post.model";
import {JobService} from '../services/job.service';
import {Job} from '../models/job.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    posts:Post[]=[];
    jobs:Job[];
   userImage=[];
   jobType=[];
   jobLength;
   imageBlog;
   categories = [ {name:'Plumber',count:0},{name:'Carpenter',count:0},{name:'Wall Painter',count:0},{name:'Electricians',count:0},{name:'Television Engineer',count:0},
   {name:'Refrigeration Engineer',count:0},{name:'Air Conditioning Engineer',count:0},{name:'Washing Machine Engineer',count:0}];
   lengthCategory=this.categories.length;
class=['fas fa-crop','fas fa-graduation-cap','fas fa-chart-line','fas fa-users','fas fa-globe','fas fa-utensils','fas fa-wrench','fas fa-medkit']
  constructor(private headerService:HeaderService,private postService:PostService,private jobService:JobService) { }
  ngOnInit() {
    this.headerService.addText('');
    this.postService.getPosts().subscribe(
          (posts: Post[]) => {
            for(let post of posts){
              if(posts.indexOf(post)<=3){
                this.posts.push(post);
              }
          }
          });
          this.jobService.getPosts('').subscribe(
                (jobs: Job[]) => {
                  this.jobLength=jobs.length;
                  for(let job of jobs){
                    for(let category of this.categories){
                       if(job.categories == category.name){
                          category.count++;
                       }
                    }
                    this.userImage.push("assets/uploads/"+job.client.profile.clientImage);

                    if(job.jobType==='Contract'){
                      this.jobType.push('accent')
                    }
                    if(job.jobType==='Part Time'){
                        this.jobType.push('primary')
                    }
                    if(job.jobType==='Full Time'){
                        this.jobType.push('warn')
                    }
                  }
                      this.jobs=jobs
                }
            );
  }

}
