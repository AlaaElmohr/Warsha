import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../services/client.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-change-password-client',
  templateUrl: './change-password-client.component.html',
  styleUrls: ['./change-password-client.component.scss']
})
export class ChangePasswordClientComponent{
  constructor(private clientService: ClientService) { }
  onSubmit(f:NgForm){
  if(f.value.password === f.value.retryPassword){
    this.clientService.changePassword(f.value.password).subscribe(
          data => console.log(data),
         error => console.error(error)
      );
  }
}
}
