import { Component, OnInit } from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import { NgForm } from "@angular/forms";
import {AppService} from '../../../services/app.service';
import {Application} from '../../../models/application.model';
@Component({
  selector: 'app-all-applications',
  templateUrl: './all-applications.component.html',
  styleUrls: ['./all-applications.component.scss']
})
export class AllApplicationsComponent implements OnInit {
  p: number = 1;
  id;
 apps:Application[];
 userImage=[];
constructor(private route:ActivatedRoute,private router:Router,private appService:AppService){}
  ngOnInit(){
    console.log('heheh');

  this.route.params.subscribe(params => {
       this.id = params['id'];
       console.log("hoho"+this.id);
   this.appService.getApps(this.id,'job').subscribe(
         (apps: Application[]) => {
           for(let app of apps){
             this.apps=apps;
             this.userImage.push("/assets/uploads/"+app.user.profile.userImage);
           }
         }
     );
});
}
onDelete(app) {
    this.appService.deleteApp(app.appId)
        .subscribe(
            result => console.log(result)
        );
}
goToApplication(app){
  console.log(app);
  this.router.navigate(['DashboardClient/Application',app.appId]);
}
}
