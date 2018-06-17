import { Component, OnInit } from '@angular/core';
import {ProfileClient} from '../../models/profileClient.model'
import {ProfileClientService} from '../../services/profileClient.service';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/client.model';
import {Email} from '../../models/email.model';
import { NgForm } from "@angular/forms";
import {SendEmailService} from '../../services/sendEmail.service';
import {HeaderService} from '../../services/header.service';

@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.scss']
})
export class EmployerProfileComponent implements OnInit {
  client:Client;
  clientId=localStorage.getItem('clientId');
  typeUser=localStorage.getItem('type');
  clientImage;
  constructor(private profileService:ProfileClientService,private clientService:ClientService,private emailService:SendEmailService,private headerService:HeaderService) {}
  ngOnInit() {
    this.headerService.addText('Employer Profile');

    this.clientService.getClient(this.clientId).subscribe(
           (client:Client)=> {
             this.client=client;
             this.clientImage ="/assets/uploads/"+this.client.profile.clientImage;
           },
          error => console.error(error)
       );
  }
  getStars(number){
    return new Array(number);
  }
  onSubmit(form:NgForm){
    console.log("heheheh");
             const email=new Email(form.value.from,this.client.email,form.value.subject,form.value.message,form.value.password);
             this.emailService.sendEmail(email).subscribe(
                 data=>console.log(data),
                 error=>console.log(error)
               )
  }

}
