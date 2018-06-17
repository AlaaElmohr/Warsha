import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
@Injectable()
export class AuthService {
  token:string;
  nameUser;
  constructor(private http: Http) {}
     signup(user,type:string) {
         const body = JSON.stringify(user);
         const headers = new Headers({'Content-Type': 'application/json'});
         if(type==='user'){
           return this.http.post('http://localhost:3000/user/signup', body, {headers: headers})
               .map((response: Response) => {console.log(response.json().token); return response.json()})
               .catch((error: Response) => Observable.throw(error.json()));
         }
           if(type==='client'){
             return this.http.post('http://localhost:3000/client/signup', body, {headers: headers})
                 .map((response: Response) => response.json())
                 .catch((error: Response) => Observable.throw(error.json()));
           }
     }
     signin(user,type:string) {
         const body = JSON.stringify(user);
         const headers = new Headers({'Content-Type': 'application/json'});
           if(type==='user'){
             return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
                 .map((response: Response) => {
                  this.nameUser=response.json().name;
                  return response.json()
                 })
                 .catch((error: Response) => {console.log(error.json()); return Observable.throw(error.json())});
           }
            if(type==='client'){
              return this.http.post('http://localhost:3000/client/signin', body, {headers: headers})
                  .map((response: Response) => response.json())
                  .catch((error: Response) => Observable.throw(error.json()));
            }
     }
     logout() {
         localStorage.clear();
     }
     isLoggedIn() {
         return localStorage.getItem('token') !== null;
     }
     deleteUser(){
       const token = localStorage.getItem('token')
           ? '?token=' + localStorage.getItem('token')
           : '';
           if(localStorage.getItem('userId') !==null){
             const  userId = localStorage.getItem('userId');
                 return this.http.delete('http://localhost:3000/user/' + userId + token)
                     .map((response: Response) => response.json())
                     .catch((error: Response) => Observable.throw(error.json()));
          }
            if(localStorage.getItem('clientId') !==null){
              const  clientId = localStorage.getItem('clientId');
                  return this.http.delete('http://localhost:3000/client/' + clientId + token)
                      .map((response: Response) => response.json())
                      .catch((error: Response) => Observable.throw(error.json()));
            }
     }
     getName(){
       return this.nameUser;
     }
     typeUser(){
       return localStorage.getItem('type');
     }

}