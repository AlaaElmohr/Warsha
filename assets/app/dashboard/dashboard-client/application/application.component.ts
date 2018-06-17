import { Component, OnInit } from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import { NgForm } from "@angular/forms";
import {AppService} from '../../../services/app.service';
import {ContractService} from '../../../services/contract.service';
import {Application} from '../../../models/application.model';
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  id;
   app:Application;
  contractId;
  userImage;
  constructor(private route:ActivatedRoute,private router:Router,private appService:AppService,private contractService:ContractService){}
  ngOnInit(){
     let clientId = localStorage.getItem('clientId');
    this.route.params.subscribe(params => {
         this.id = params['id'];

     this.appService.getApps(this.id,'application').subscribe(
           (app: Application[]) => {
               this.app=app[0];
              this.userImage="/assets/uploads/"+this.app.user.profile.userImage;
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
        this.router.navigate(['DashboardClient/ActivatedContract'])
  }
visitProfile(){
  this.router.navigate(['Candinate/Profile/', this.app.user._id]);
}
}
