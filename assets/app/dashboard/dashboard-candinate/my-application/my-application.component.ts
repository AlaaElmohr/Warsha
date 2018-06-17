import { Component, OnInit } from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import { NgForm } from "@angular/forms";
import {AppService} from '../../../services/app.service';
import {ContractService} from '../../../services/contract.service';
import {Application} from '../../../models/application.model';
@Component({
  selector: 'app-my-application',
  templateUrl: './my-application.component.html',
  styleUrls: ['./my-application.component.scss']
})
export class MyApplicationComponent implements OnInit {
  id;
   app:Application;
  contractId;
  constructor(private route:ActivatedRoute,private router:Router,private appService:AppService,private contractService:ContractService){}
  ngOnInit(){
     let clientId = localStorage.getItem('clientId');
    this.route.params.subscribe(params => {
         this.id = params['id'];

     this.appService.getApps(this.id,'application').subscribe(
           (app: Application[]) => {
               this.app=app[0];
               console.log(this.app);
           }
       );
  });
  }
  updateApp(app,status){
  app.status=status;
    this.appService.updateApp(app)
        .subscribe(
            result => console.log(result)
        );
  }
  makeContract(){
    this.contractService.addContract(this.app)
        .subscribe(
          (result) => {
            this.app.contractId=result;
            console.log("result"+ result);
            console.log("result"+ this.app.contractId);
            // this.router.navigate(['activateContract', this.app.contractId]);
          }
        );
  }
  finishContract(app){
    this.contractService.finishContract(app)
        .subscribe(
            result => console.log(result)
        );
  }
visitProfile(){
  this.router.navigate(['Candinate/Profile/', this.app.user._id]);
}
}
