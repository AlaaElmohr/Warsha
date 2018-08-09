import { Component, OnInit } from '@angular/core';
import { FeedBack } from "../../../models/feedback.model";
import { NgForm } from "@angular/forms";
import { Router,ActivatedRoute  } from "@angular/router";
import { ContractService } from '../../../services/contract.service';
@Component({
  selector: 'app-FeedBackToUser',
  templateUrl: './FeedBackToUser.component.html',
  styleUrls: ['./FeedBackToUser.component.scss']
})
export class FeedBackToUserComponent implements OnInit {
  constructor(private route: ActivatedRoute ,private contractService: ContractService,private router:Router) {}
id;
type;
stars;
// /stars;
rate(value){
  this.stars=value;
}
  onSubmit(form:NgForm){
   const feedback=new FeedBack(this.stars,form.value.comment);
   this.contractService.addFeedBack(this.id,feedback,this.type)
      .subscribe(
         data => console.log(data),
         error => console.error(error)
      );
 form.reset();
 this.router.navigate(['DashboardClient/ActivatedContract']);
}

ngOnInit(){

  this.route.params.subscribe(params => {
       this.id = params['id'];
       this.type = params['type'];
       console.log("type"+this.type)
    });
}
}
