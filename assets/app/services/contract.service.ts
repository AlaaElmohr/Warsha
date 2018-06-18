import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Application } from "../models/application.model";
import { Contract } from "../models/contract.model";
import { FeedBack } from "../models/feedback.model";

@Injectable()
export class ContractService{
    constructor(private http: Http) {}
    addContract(contract){
      const body = JSON.stringify(contract);
      console.log("body"+body);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.post('http://localhost:3000/contract' + token, body, {headers: headers})
          .map((response: Response) => {
            const result = response.json();
            console.log("response"+ result.obj._id);
            return result.obj._id;
          }
     )
          .catch((error: Response) => Observable.throw(error.json()));
    }
    finishContract(contract){
      const body = JSON.stringify(contract);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.patch('http://localhost:3000/contract' + token, body, {headers: headers})
          .map((response: Response) => {
              const result = response.json();
          })
          .catch((error: Response) => Observable.throw(error.json()));
    }
    getContracts(type) {
      const token = localStorage.getItem('token')
          ? 'token=' + localStorage.getItem('token')
          : '';
          const typeQuery= '?query=' + type + '&' + token;
        return this.http.get('http://localhost:3000/contract' +  typeQuery)
            .map((response: Response) => {
              const contracts= response.json().obj;
              let contractValue: Contract[] = [];
              for (let contract of contracts) {
                  contractValue.push(new Contract(
                    contract.title,
                    contract.startTime,
                    contract.finishTime,
                     contract.budget,
                     contract.status,
                     contract.user,
                     contract._id,
                     contract.job,
                     contract.client,
                     contract.feedbacks
                   )
                  );
              }
              console.log("contract"+contractValue);
              return contractValue;

            })
          //  .catch((error: Response) => Observable.throw(error.json()));
    }
    getContract(id) {
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
        return this.http.get('http://localhost:3000/contract/' +id+  token)
            .map((response: Response) => {
              const contract= response.json().obj;
                  let contractValue=new Contract(
                    contract.title,
                    contract.startTime,
                    contract.finishTime,
                     contract.budget,
                     contract.status,
                     contract.user,
                     contract._id,
                     contract.job,
                     contract.client,
                   );
              console.log(contractValue);
              return contractValue;
            })
          .catch((error: Response) => Observable.throw(error.json()));
    }
    deleteApp(id){
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
          console.log(id);
      return this.http.delete('http://localhost:3000/application/' + id + token)
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
    }
    updateApp(app){
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
        let  id=app.appId;

      return this.http.patch('http://localhost:3000/application/' + id + token,app)
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
    }
    addFeedBack(id,feedback,type){
      console.log("type" + type);
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
          var typeParam= '?type=' + type;
          console.log(typeParam);
      return this.http.post('http://localhost:3000/feedback/' + id + typeParam  ,feedback)
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
    }
    getFeedback(id,status){
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
        return this.http.get('http://localhost:3000/feedback/' + id + '/' +  status + token)
            .map((response: Response) => {
              const feedbacks= response.json().obj;
              let feedbackValue:FeedBack[]=[];
              for(let feedback of  feedbacks){
                feedbackValue.push(new FeedBack(feedback.stars,feedback.comment));
              }
              console.log(feedbackValue);
              return feedbackValue;
            })
          .catch((error: Response) => Observable.throw(error.json()));
    }
}
