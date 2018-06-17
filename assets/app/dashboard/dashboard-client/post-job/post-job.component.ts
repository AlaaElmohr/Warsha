import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {Router , ActivatedRoute} from '@angular/router';
import { NgForm } from "@angular/forms";
import { JobService } from '../../../services/job.service'
import { Job } from "../../../models/job.model";

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent implements OnInit {
  visible: boolean = true;
  skills=[];
   selectable: boolean = true;
   removable: boolean = true;
   addOnBlur: boolean = true;
   separatorKeysCodes = [ENTER, COMMA];
   deadline;
   id;
   jobTypes = [
    {value: '0', viewValue: 'Full Time'},
    {value: '1', viewValue: 'Part Time'},
    {value: '2', viewValue: 'Contract'}
  ];
  categories = [
   {value: '0', viewValue: 'Plumber'},
   {value: '1', viewValue: 'Carpenter'},
   {value: '2', viewValue: 'Wall Painter'},
   {value: '3', viewValue: 'Electricians'},
   {value: '4', viewValue: 'Television Engineer'},
   {value: '5', viewValue: 'Refrigeration Engineer'},
   {value: '6', viewValue: 'Air Conditioning Engineer'},
   {value: '7', viewValue: 'Washing Machine Engineer'}
  ];
   post:Job;
  editMode=false;
   constructor(private router:Router,private route:ActivatedRoute,private jobService:JobService) { }
   addEvent(event: MatDatepickerInputEvent<Date>) {
         this.deadline=` ${event.value}`;
   }
   addSkill(event: MatChipInputEvent): void {
     let input = event.input;
     let value = event.value;
     if ((value || '').trim()) {
       this.skills.push(value.trim());
     }
     if (input) {
       input.value = '';
     }
   }
   removeSkill(value: any): void {
     let index = this.skills.indexOf(value);
     if (index >= 0) {
       this.skills.splice(index, 1);
     }
   }
   onSubmit(form:NgForm){
     //  console.log("form" + form.value.email);
     let type;
     let categoryValue;
     for( let jobType of this.jobTypes){
       if(jobType.value=== form.value.jobType){
          type=jobType.viewValue
       }
     }
     for( let category of this.categories){
       if(category.value=== form.value.categories){
          categoryValue=category.viewValue
       }
     }
     console.log("categoryValue"+categoryValue);
    if(this.editMode===false){
      const post=new Job(form.value.title,form.value.description,categoryValue,form.value.salary,type,this.skills,this.deadline,form.value.country,form.value.city,form.value.address);
      this.jobService.addPost(post)
         .subscribe(
             data => console.log(data),
            error => console.error(error)
         );
    }
    else{
      const post=new Job(form.value.title,form.value.description,form.value.categories,form.value.salary,type,this.skills,this.deadline,form.value.country,form.value.city,form.value.address,this.post.clientId,this.post.jobId);
      this.jobService.editPost(post,this.id)
         .subscribe(
             data => console.log(data),
            error => console.error(error)
         );
    }
    form.reset();
     }

   ngOnInit(){
     this.route.params.subscribe(params => {
          this.id = params['id']; // (+) converts string 'id' to a number
          console.log(params);
          console.log(params['id']);
           console.log(this.id);
          if(this.id){
           this.editMode=true;
           this.jobService.getPostById(this.id).subscribe(

                   data => {this.post=data;console.log(data);},
                  error => console.error(error)
               );
          }
     });
   }


}
