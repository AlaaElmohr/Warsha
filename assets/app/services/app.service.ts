import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Application } from "../models/application.model";

@Injectable()
export class AppService{
    constructor(private http: Http) {}
    addApplication(app:Application){
        console.log(app);
      const body = JSON.stringify(app);
      console.log(body);
      const headers = new Headers({'Content-Type': 'application/json'});
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
      return this.http.post('https://warsha-2.herokuapp.com/application' + token, body, {headers: headers})
          .map((response: Response) => {
              const result = response.json();
          })
          .catch((error: Response) => Observable.throw(error.json()));
    }
    getApps(id,type) {
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
        return this.http.get('https://warsha-2.herokuapp.com/application/' + id + '?query=' + type )
            .map((response: Response) => {
                const apps = response.json().obj;
                let applications: Application[] = [];
                console.log(applications);
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
                    console.log('service'+app);
                }
                return applications;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }
    deleteApp(id){
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
          console.log(id);
      return this.http.delete('https://warsha-2.herokuapp.com/application/' + id + token)
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
    }
    updateApp(app){
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
        let  id=app.appId;

      return this.http.patch('https://warsha-2.herokuapp.com/application/' + id + token,app)
          .map((response: Response) => response.json())
          .catch((error: Response) => Observable.throw(error.json()));
    }

}
