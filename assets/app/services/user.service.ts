import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { User } from "../models/user.model";
@Injectable()
export class UserService {

  private users: User[] = [];
    constructor(private http: Http) {}
changePassword(password){
  const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
  const body = {password:password};
  const  id = localStorage.getItem('userId');
  return this.http.patch('http://app-warsha-1.herokuapp.comuser/changepassword/' + id +token, body)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
}
getUsers(filter){
  const token = localStorage.getItem('token')
      ? 'token=' + localStorage.getItem('token')
      : '';
const body = JSON.stringify(filter);
const query='?query=' + body +'&' +token;
  return this.http.get('http://app-warsha-1.herokuapp.comuser' + query)
      .map((response: Response) => {
          const users = response.json().obj;
          console.log(users.length);
          let transformedUsers: User[] = [];
          for (let user of users) {
            console.log(user);
              transformedUsers.push(new User(
                  user.name,
                  user.email,
                  user.memberSince,
                  user.profile,
                  0,
                  user.totalEarned,
                  user.stars,
                  user.contracts,
                  user._id
                )
              );
          }
          this.users = transformedUsers;
          return transformedUsers;
      })
      .catch((error: Response) => Observable.throw(error.json()));
}
getUser(value,type){
  const token = localStorage.getItem('token')
      ? 'token=' + localStorage.getItem('token')
      : '';
    let query='?query=' + type + '&' + token;
   let result;
  result= this.http.get('http://app-warsha-1.herokuapp.comuser/'+value+ query);
    return result.map((response: Response) => {
              const users = response.json().obj[0];
              const jobDoneCount = response.json().obj[1];
              let userValue: User[]=[];
              for (let user of users){
                    userValue.push(new User(
                        user.name,
                        user.email,
                        user.memberSince,
                        user.profile,
                        jobDoneCount[users.indexOf(user)],
                        user.totalEarned,
                        user.stars,
                        user.contracts,
                        user._id
                      ))
              }

              return userValue;
          })
          .catch((error: Response) => Observable.throw(error.json()));

}
}
