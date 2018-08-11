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
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.post('http://app-warsha-1.herokuapp.com/contract' + token, body, {headers: headers})
          .map((response: Response) => {
            const result = response.json();
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
      return this.http.patch('http://app-warsha-1.herokuapp.com/contract' + token, body, {headers: headers})
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
        return this.http.get('http://app-warsha-1.herokuapp.com/contract' +  typeQuery)
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
              return contractValue;

            })
          //  .catch((error: Response) => Observable.throw(error.json()));
    }
    getContract(id) {
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
        return this.http.get('http://app-warsha-1.herokuapp.com/contract/' +id+  token)
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
              return contractValue;
            })
          .catch((error: Response) => Observable.throw(error.json()));
    }
    deleteApp(id){
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.delete('http://app-warsha-1.herokuapp.com/application/' + id + token)
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
    }
    updateApp(app){
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
        let  id=app.appId;

      return this.http.patch('http://app-warsha-1.herokuapp.com/application/' + id + token,app)
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
    }
    addFeedBack(id,feedback,type){
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
          var typeParam= '?type=' + type;
      return this.http.post('http://app-warsha-1.herokuapp.com/feedback/' + id + typeParam  ,feedback)
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
    }
    getFeedback(id,status){
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
        return this.http.get('http://app-warsha-1.herokuapp.com/feedback/' + id + '/' +  status + token)
            .map((response: Response) => {
              const feedbacks= response.json().obj;
              let feedbackValue:FeedBack[]=[];
              for(let feedback of  feedbacks){
                feedbackValue.push(new FeedBack(feedback.stars,feedback.comment));
              }
              return feedbackValue;
            })
          .catch((error: Response) => Observable.throw(error.json()));
    }
}
