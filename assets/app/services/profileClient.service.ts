import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { ProfileClient } from "../models/profileClient.model";

@Injectable()
export class ProfileClientService {
    constructor(private http: Http) {}
    addProfile(formData) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
            return this.http.post('http://localhost:3000/client/profile' + token, formData )
                    .map(files => files.json())
      }
    updateProfile(formData) {
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
        return this.http.patch('http://localhost:3000/client/profile' + token, formData )
                .map(files => files.json())
    }

    getProfile() {
         const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
            const id=localStorage.getItem('clientId')
            return this.http.get('http://localhost:3000/client/profile/' + id +  token , {headers: headers})
            .map((response: Response) => {
              const client= response.json().obj;
              const profile= client.profile;
              if(profile != undefined){
                let profileValue=new ProfileClient(
                profile.clientImage,
                  profile.age,
                   profile.description,
                   profile.phoneNumber,
                   profile.websiteLink,
                   profile.facebookLink,
                   profile.twitterLink,
                   profile.googleLink,
                   profile.linkedinLink,
                   profile.country,
                   profile.city,
                   profile.address,
                   client.name,
                   client.email,
                   client.memberSince
                  );
                  return profileValue;
              }                    
            })
    }
}
