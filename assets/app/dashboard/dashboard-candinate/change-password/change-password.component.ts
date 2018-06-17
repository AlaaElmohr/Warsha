import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import { NgForm } from "@angular/forms";
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent{
  constructor(private userService: UserService) { }
  onSubmit(f:NgForm){
    if(f.value.password === f.value.retryPassword){
      this.userService.changePassword(f.value.password).subscribe(
            data => console.log(data),
           error => console.error(error)
        );

  }
}
}
