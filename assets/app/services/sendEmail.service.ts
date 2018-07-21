import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import {Email} from '../models/email.model';
@Injectable()
export class SendEmailService{
    constructor(private http: Http) {}
    sendEmail(email:Email){
      console.log(email);
      const body = JSON.stringify(email);
      console.log(body);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.post('http://warsha-2.herokuapp.com/sendEmail' + token, body, {headers: headers})
          .map((response: Response) => {
              const result = response.json();
          })
          .catch((error: Response) => Observable.throw(error.json()));
    }
  }
