import { Component, OnInit } from '@angular/core';
import {JobService} from '../../services/job.service';
import {Job} from '../../models/job.model';
import { Application } from "../../models/application.model";
import { NgForm } from "@angular/forms";
import { Router,ActivatedRoute  } from "@angular/router";
import { AppService } from '../../services/app.service';
import {HeaderService} from '../../services/header.service';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.scss']
})
export class ApplyJobComponent implements OnInit {
  constructor(private jobService: JobService, private route: ActivatedRoute,private appService :AppService,private headerService:HeaderService ,private router:Router) {}
id;
job:Job;
editMode=false;
durationTypes = [
 {value: '0', viewValue: 'Day'},
 {value: '1', viewValue: 'Week'},
 {value: '2', viewValue: 'Month'},
];
getStars(number){
  if(number%2 != 0){
    number=Math.ceil(number);
  }
  return new Array(number);
}
  onSubmit(form:NgForm){
    let duration;
    for( let durationType of this.durationTypes){
      if(durationType.value=== form.value.durationType){
         duration=form.value.duration + durationType.viewValue
      }
    }
    console.log("duration"+duration)
   const app=new Application(form.value.coverLetter,form.value.bid,duration,this.id);
   console.log("app"+app)
   this.appService.addApplication(app)
      .subscribe(
          data => console.log(data),
         error => console.error(error)
      );
 form.reset();
 this.router.navigate(['DashboardUser/Proposals']);

}
reset(form:NgForm){
  form.reset();

}
ngOnInit(){
  this.headerService.addText('Apply Job');
 this.route.params.subscribe(params => {
      this.id = params['id'];
       this.jobService.getPostById(this.id).subscribe(
               data => {this.job=data;console.log(data);},
              error => console.error(error)
           );
      });
 }

}
