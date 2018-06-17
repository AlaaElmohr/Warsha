
import { Component , OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Login} from "../models/login.model";
import { AuthService} from "../services/auth.service";
import {HeaderService} from '../services/header.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  type;
  error;
  constructor(private authService: AuthService, private router: Router,private headerService:HeaderService) {}
  selectType(value:string){
  this.type=value;
  }
  ngOnInit(){
    this.headerService.addText('Login');  }
     onSubmit(form:NgForm) {
       if(!this.type){
         this.error='you should choose your type'
       }
         const user = new Login(form.value.email, form.value.password);
             this.authService.signin(user,this.type)
               .subscribe(
                   data => {
                     localStorage.setItem('type',this.type);
                     if(this.type==='user'){
                       localStorage.setItem('token', data.token);
                       localStorage.setItem('userId', data.userId);
                     }
                     else{
                       localStorage.setItem('token', data.token);
                       localStorage.setItem('clientId', data.clientId);

                     }
                     this.router.navigateByUrl('/JobsList');
                   },
                   error => {this.error=error.error.message;console.log("error"+error.error.message)}
               );
         form.reset();
     }

}
