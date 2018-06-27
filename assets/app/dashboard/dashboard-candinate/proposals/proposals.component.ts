import { Component, OnInit } from '@angular/core';
import { AppService} from '../../../services/app.service';
import {Application} from '../../../models/application.model';
import { Router,ActivatedRoute  } from "@angular/router";

@Component({
  selector: 'app-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.scss']
})
export class ProposalsComponent implements OnInit {
  apps:Application[];
  p: number = 1;
  constructor(private appService:AppService,private router:Router){}
  ngOnInit(){
    const userId = localStorage.getItem('userId');
     this.appService.getApps(userId,'user').subscribe(
           (apps: Application[]) => {
             for(let app of apps){
               this.apps=apps;
               console.log("app"+this.apps)
             }
           }
       );
  }
  onDelete(app) {
    this.apps.splice(this.apps.indexOf(app),1);
      this.appService.deleteApp(app.appId)
          .subscribe(
              result => console.log(result)
          );
  }
  goToApplication(app){
    this.router.navigate(['DashboardUser//MyApplication/', app.appId]);
  }

}
