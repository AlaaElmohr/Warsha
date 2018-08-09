import { Component, OnInit,ViewChild,Input } from '@angular/core';
import { AuthService} from "../services/auth.service";
import { UserService} from "../services/user.service";
import {User} from '../models/user.model';
import {Client} from '../models/client.model';
import {Router , ActivatedRoute} from '@angular/router';
import {HeaderService} from '../services/header.service'
import { Observable } from "rxjs";
import 'rxjs/Rx';
import { NgForm } from "@angular/forms";
import {ClientService} from '../services/client.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
expandValue=false ;
counter:number=0;
showNavbar=false;
userName;
text;
userImage;
constructor(private authService: AuthService,private router:Router,private route:ActivatedRoute,private headerService:HeaderService,private userService :UserService,private clientService:ClientService) {
}
typeUser(){
  return this.authService.typeUser();
}
 ngOnInit() {
   this.text=this.headerService.getText();
   let type=this.typeUser();
   if(type){
   if(type=='client'){
     const clientId=localStorage.getItem('clientId');
     this.clientService.getClient(clientId)
     .subscribe(
         (client:Client)=> {
           this.userName=client.name
           if(client.profile != undefined){
             this.userImage ="/assets/uploads/"+client.profile.clientImage;
           }
           },
           error => console.error(error)
        );
   }
   else{
     const userId=localStorage.getItem('userId');
     this.userService.getUser(userId,'id')
     .subscribe(
         (user:User[])=> {
           this.userName=user[0].name;
           if(user[0].profile != undefined){
             this.userImage ="/assets/uploads/"+user[0].profile.userImage;
           }
        },
        );

   }
 }
  }
  onSubmit(f:NgForm){
 this.router.navigate(['JobsList/',f.value.title,f.value.city]);
  }
  isLoggedIn() {
    return this.authService.isLoggedIn();
}
logOut(){
  this.router.navigateByUrl('/Login');
  return this.authService.logout();
}

  expand(){
    this.counter++;
    if(this.counter%2 !==0){
          this.expandValue=true;
    }
    else{
          this.expandValue=false;
    }
  }

}
