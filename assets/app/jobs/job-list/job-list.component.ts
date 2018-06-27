import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {JobService} from '../../services/job.service';
import {Job} from '../../models/job.model';
import {HeaderService} from '../../services/header.service';
import {Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit{
  jobs:Job[];
  categories = [ 'Plumber','Carpenter','Wall Painter','Electricians','Television Engineer','Refrigeration Engineer','Air Conditioning Engineer','Washing Machine Engineer'];
  filter={city:'',category:[],jobType:[],budget:[]};
jobLength;
search;
title;
city;
filterCategory=[];
filterJobType=[];
filterBudget=[];
jobTypes=['Full Time','Part Time','Contract'];
budget=[0,100,200,300,400];
 constructor(private jobService:JobService,private headerService:HeaderService,private route:ActivatedRoute){}
 ngOnInit(){
   this.headerService.addText('Job List');
   this.route.params.subscribe(params => {
        this.title= params['title'];
        this.city= params['city'];
        if(this.title){
          this.search={title:this.title,city:this.city}
          console.log("search"+this.search.title)
        }
        else{
          this.search='';
          console.log("search"+this.search.title)

        }
    this.jobService.getPosts(this.search).subscribe(
          (jobs: Job[]) => {
            this.jobLength=jobs.length;
            for(let job of jobs){
              console.log(job);
            }
              this.jobs= jobs;
          }
      );
 })
 }
 onDelete(post) {
     this.jobService.deleteJob(post)
         .subscribe(
             result => console.log(result)
         );
 }
 getStars(number){
   if(number%2 != 0){

     number=Math.ceil(number);
     console.log("hi")
   }
   return new Array(number);
 }
  panelOpenState: boolean = false;
  p: number = 1;
  collection: any[] = [1,2,4,5,6,7,7,9,9,9,9,9,9,9,9,9,1,2,4,5,6,7,7,9,9,9,9,9,9,9,9,9,1,2,4,5,6,7,7,9,9,9,9,9,9,9,9,9,1,2,4,5,6,7,7,9,9,9,9,9,9,9,9,9];
  visible: boolean = true;
   selectable: boolean = true;
   removable: boolean = true;
   addOnBlur: boolean = true;
   // Enter, comma
   separatorKeysCodes = [ENTER, COMMA];

   fruits = [
     { name: 'Lemon' },
     { name: 'Lime' },
     { name: 'Apple' },
   ];


   add(event: MatChipInputEvent): void {
     let input = event.input;
     let value = event.value;

     // Add our fruit
     if ((value || '').trim()) {
       this.fruits.push({ name: value.trim() });
     }

     // Reset the input value
     if (input) {
       input.value = '';
     }
   }

   remove(fruit: any): void {
     let index = this.fruits.indexOf(fruit);

     if (index >= 0) {
       this.fruits.splice(index, 1);
     }
   }
   filterJob(by,value,e){
    if(by===0){
   this.filter.city=value;
   }
   if(by=== 1){
     if(e.checked==true){
       this.filterCategory.push(value);
       this.filter.category=this.filterCategory;
       console.log(e);
     }
     if(e.checked==false){
       this.filterCategory.splice(this.filterCategory.indexOf(value),1);
       this.filter.category=this.filterCategory;
       console.log(e);
     }
   }
   if(by=== 2){
     if(e.checked==true){
       this.filterJobType.push(value);
       this.filter.jobType=this.filterJobType;
       console.log(e);
     }
     if(e.checked==false){
       this.filterJobType.splice(this.filterJobType.indexOf(value),1);
       this.filter.jobType=this.filterJobType;
       console.log(e);
     }
   }
   if(by=== 3){
     if(e.checked==true){
       this.filterBudget.push(value);
       this.filter.budget=this.filterBudget;
       console.log(e);
     }
     if(e.checked==false){
       this.filterBudget.splice(this.filterBudget.indexOf(value),1);
       this.filter.budget=this.filterBudget;
       console.log(e);
     }
   }
    this.jobService.getPosts(this.filter).subscribe(
      (jobs: Job[]) => {
        for(let job of jobs){
          console.log(job);
        }
          this.jobs= jobs;
      }
    );
   }

}
