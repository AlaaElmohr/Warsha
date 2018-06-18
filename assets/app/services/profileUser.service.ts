import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { ProfileUser } from "../models/profileUser.model";
@Injectable()
export class ProfileUserService {
    constructor(private http: Http) {}
    addProfile(formData) {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
            return this.http.post('https://app-warsha.herokuapp.com/user/profile' + token, formData )
                    .map(files => files.json())
      }
    updateProfile(formData) {
      const token = localStorage.getItem('token')
          ? '?token=' + localStorage.getItem('token')
          : '';
        return this.http.patch('https://app-warsha.herokuapp.com/user/profile' + token, formData )
                .map(files => files.json())
    }
    getProfile(id) {
         const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
          //  const id=localStorage.getItem('userId')
            return this.http.get('https://app-warsha.herokuapp.com/user/profile/' + id +  token , {headers: headers})
            .map((response: Response) => {
              const user= response.json().obj;
              const profile= user.profile;
              console.log(profile);
              let profileValue=new ProfileUser(
                profile.userImage,
                profile.jobTitle,
                profile.educationLevel,
                profile.age,
                profile.languages,
                 profile.experience,
                 profile.coverLetter,
                 profile.phoneNumber,
                 profile.websiteLink,
                 profile.facebookLink,
                 profile.twitterLink,
                 profile.googleLink,
                 profile.linkedinLink,
                 profile.country,
                 profile.city,
                 profile.address,
                 profile.categories,
                profile.education.educationTitle,
                 profile.education.from,
                 profile.education.to,
                 profile.education.institue,
                 profile.education.description,
                 profile.workExperience.title,
                 profile.workExperience.from,
                 profile.workExperience.to,
                 profile.workExperience.company,
                 profile.workExperience.description,
                 user.name,
                 user.email,
                 user.memberSince
                );
              return profileValue;
            })
    }
}
