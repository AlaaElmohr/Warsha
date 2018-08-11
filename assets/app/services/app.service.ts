import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Application } from "../models/application.model";

@Injectable()
export class AppService{
    constructor(private http: Http) {}
    addApplication(app:Application){
      const body = JSON.stringify(app);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.post('http://app-warsha-1.herokuapp.com/application' + token, body, {headers: headers})
          .map((response: Response) => {
              const result = response.json();
          })
          .catch((error: Response) => Observable.throw(error.json()));
    }
    getApps(id,type) {
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
        return this.http.get('http://app-warsha-1.herokuapp.com/application/' + id + '?query=' + type )
            .map((response: Response) => {
                const apps = response.json().obj;
                let applications: Application[] = [];
                for (let app of apps) {
                    applications.push(new Application(
                      app.coverLetter,
                      app.bid,
                      app.duration,
                       app.job,
                       app.user,
                       app._id,
                       app.status
                     )
                    );
                }
                return applications;
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

      return this.http.patch('http://localhost:3000application/' + id + token,app)
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
    }

}
