import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Client} from "../models/client.model";
@Injectable()
export class ClientService {
  private clients: Client[] = [];
constructor(private http: Http) {}
changePassword(password){
  const body = {password:password};
  const  id = localStorage.getItem('clientId');
  return this.http.patch('https://app-warsha-1.herokuapp.com/client/changepassword/' + id, body)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
}
getClients(){
  return this.http.get('https://app-warsha-1.herokuapp.com/client')
      .map((response: Response) => {
          const clients = response.json().obj;
          let transformedClients: Client[] = [];
          for (let client of clients) {
              transformedClients.push(new Client(
                  client.name,
                  client.title,
                  client.city
                )
              );
          }
          this.clients = transformedClients;
          return transformedClients;
      })
      .catch((error: Response) => Observable.throw(error.json()));
}
getClient(id){
  const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
let result;
  result= this.http.get('https://app-warsha-1.herokuapp.com/client/'+id+token);
    return result.map((response: Response) => {
              const client = response.json().obj[0];
                const jobPostedCount = response.json().obj[1];
                const jobDoneCount = response.json().obj[2];
              let clientValue: Client;
                  clientValue=new Client(
                      client.name,
                      client.email,
                      client.memberSince,
                      client.profile,
                      jobPostedCount,
                      jobDoneCount,
                      client.totalSpent,
                      client.stars,
                      client.contracts
                    )
              return clientValue;
          })
          .catch((error: Response) => Observable.throw(error.json()));

}
}
