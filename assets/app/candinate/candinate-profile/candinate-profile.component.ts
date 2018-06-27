import { Component, OnInit } from '@angular/core';
import {ProfileUser} from '../../models/profileUser.model';
import {Router , ActivatedRoute} from '@angular/router';
import {User} from '../../models/user.model'
import {UserService} from '../../services/user.service'
import {ProfileUserService} from '../../services/profileUser.service';
import { NgForm } from "@angular/forms";
import {Email} from '../../models/email.model';
import {SendEmailService} from '../../services/sendEmail.service';
import {HeaderService} from '../../services/header.service';

@Component({
  selector: 'app-candinate-profile',
  templateUrl: './candinate-profile.component.html',
  styleUrls: ['./candinate-profile.component.scss']
})
export class CandinateProfileComponent implements OnInit {
  user:User;
  id;
  profileId;
  typeUser=localStorage.getItem('type');
  userImage;
  constructor(private profileService:ProfileUserService,private route:ActivatedRoute,private userService:UserService,private emailService:SendEmailService,private headerService:HeaderService) {}
  ngOnInit() {
    this.headerService.addText('Candinate Profile');
    this.route.params.subscribe(params => {
         this.id = params['id'];
         if(this.id){
           this.profileId=this.id;
         }
         else{
           this.profileId=localStorage.getItem('userId')
         }
         this.userService.getUser(this.profileId,'id').subscribe(
             (user:User[])=> {
               console.log(user[0]);
               this.user=user[0];
              this.userImage ="/assets/uploads/"+this.user.profile.userImage;
              console.log(this.userImage)
               },
               error => console.error(error)
            );
       });
  }
  getStars(number){
    if(number%2 != 0){
      number=Math.ceil(number);
    }
    return new Array(number);
  }
  onSubmit(form:NgForm){
             const email=new Email(form.value.from,this.user.email,form.value.subject,form.value.message,form.value.password);
             this.emailService.sendEmail(email).subscribe(
                 data=>console.log(data),
                 error=>console.log(error)
               )
  }
}
