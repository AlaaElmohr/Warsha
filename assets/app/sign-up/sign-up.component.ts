import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm } from "@angular/forms";
import { SignUp} from "../models/signup.model";
import { AuthService} from "../services/auth.service";
import {HeaderService} from '../services/header.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent  implements OnInit{
 type;
 error;
  selectType(value:string){
  this.type=value;
  }
 constructor(private authService: AuthService, private router: Router,private headerService:HeaderService) {}
 ngOnInit(){
   this.headerService.addText('Sign Up'); }
onSubmit(form: NgForm) {
  if(!this.type){
    this.error='you should choose your type'
  }
  const user = new SignUp(
      form.value.email,
      form.value.password,
      form.value.name
  );

    this.authService.signup(user,this.type)
    .subscribe(
        data => {
          localStorage.setItem('type',this.type);
          if(this.type==='user'){
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            this.router.navigateByUrl('/DashboardUser/MyProfile');

          }
          else{
            localStorage.setItem('token', data.token);
            localStorage.setItem('clientId', data.clientId);
            this.router.navigateByUrl('/DashboardClient/MyProfile');

          }

        },
        error => this.error=error.error.message
    );
    form.reset();
}
}
