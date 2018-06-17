import { Component, OnInit } from '@angular/core';
import {JobService} from '../../services/job.service';
import {Job} from '../../models/job.model';
import {ActivatedRoute} from '@angular/router';
import {Email} from '../../models/email.model';
import { NgForm } from "@angular/forms";
import {SendEmailService} from '../../services/sendEmail.service';
import {HeaderService} from '../../services/header.service';

@Component({
  selector: 'app-job-post',
  templateUrl: './job-post.component.html',
  styleUrls: ['./job-post.component.scss']
})
export class JobPostComponent implements OnInit {
  constructor(private jobService: JobService, private route: ActivatedRoute,private emailService:SendEmailService,private headerService:HeaderService ) {}
id;
job:Job;
editMode=false;
jobCount:Number;
getStars(number){
  return new Array(number);
}
ngOnInit(){
  this.headerService.addText('Job Post');
 this.route.params.subscribe(params => {
      this.id = params['id'];
       this.jobService.getPostById(this.id).subscribe(
               data => {
                 this.job=data;
               this.jobCount=this.job.client.contracts.length;
               },
              error => console.error(error)
           );
      });
 }
 onSubmit(form:NgForm){
   console.log("heheheh");
            const email=new Email(form.value.from,this.job.client.email,form.value.subject,form.value.message,form.value.password);
            this.emailService.sendEmail(email).subscribe(
                data=>console.log(data),
                error=>console.log(error)
              )
 }
}
