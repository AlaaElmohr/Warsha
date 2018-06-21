import { Component, OnInit } from '@angular/core';
import { FeedBack } from "../../../models/feedback.model";
import { NgForm } from "@angular/forms";
import { Router,ActivatedRoute  } from "@angular/router";
import { ContractService } from '../../../services/contract.service';
@Component({
  selector: 'app-FeedBackToClient',
  templateUrl: './FeedBackToClient.component.html',
  styleUrls: ['./FeedBackToClient.component.scss']
})
export class FeedBackToClientComponent implements OnInit {
  constructor(private route: ActivatedRoute ,private contractService: ContractService,private router:Router) {}
id;
type;
stars = [1,2,3,4,5];
// /stars;
  onSubmit(form:NgForm){

   const feedback=new FeedBack(form.value.stars,form.value.comment);
   this.contractService.addFeedBack(this.id,feedback,this.type)
      .subscribe(
         data => console.log(data),
         error => console.error(error)
      );
  this.router.navigate(['DashboardUser/AppliedJobs']);
 form.reset();
}

ngOnInit(){

  this.route.params.subscribe(params => {
       this.id = params['id'];
       this.type = params['type'];
       console.log("type"+this.type)
    });
}
}
