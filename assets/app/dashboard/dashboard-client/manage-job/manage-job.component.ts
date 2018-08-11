import { Component, OnInit } from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import { JobService } from '../../../services/job.service'
import { Job } from "../../../models/job.model";
import {ClientService} from '../../../services/client.service';
import {Client} from '../../../models/client.model'
@Component({
  selector: 'app-manage-job',
  templateUrl: './manage-job.component.html',
  styleUrls: ['./manage-job.component.scss']
})
export class ManageJobComponent implements OnInit {
  client:Client;
  jobs:Job[]=[];
clientId=localStorage.getItem('clientId');
 constructor(private jobService:JobService,private router:Router,private route:ActivatedRoute,private clientService:ClientService){}
 ngOnInit(){
    let  client=localStorage.getItem('clientId');
    this.jobService.getPosts('').subscribe(
          (jobs: Job[]) => {
            for(let job of jobs){
              if(client === job.clientId){
                  this.jobs.push(job);
              }
            }
          }
      );
      this.clientService.getClient(this.clientId).subscribe(
        (client: Client) => {
          this.client=client;
        }
      )
 }
 onDelete(job) {
     this.jobService.deleteJob(job)
         .subscribe(
             result =>{
               this.jobs.splice(this.jobs.indexOf(job),1);
             }
         );
 }
  goToEdit(){
   this.router.navigate(['DashboardClient/PostJob']);
  }
  goToApplication(id){
    this.router.navigate(['DashboardClient/AllApplications', id]);
  }
}
