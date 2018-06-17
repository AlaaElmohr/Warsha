import { Component, OnInit } from '@angular/core';
import {ProfileClient} from '../../../models/profileClient.model';
import {ProfileClientService} from '../../../services/profileClient.service';
import { NgForm } from "@angular/forms";
import {Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-profile-client',
  templateUrl: './edit-profile-client.component.html',
  styleUrls: ['./edit-profile-client.component.scss']
})
export class EditProfileClientComponent implements OnInit {
  filesToUpload: Array<File> = [];
  url;
  action='Set';
  profile;
  imageName;
  editMode=false;
  constructor(private profileService: ProfileClientService,private router:Router) {}
  ngOnInit(){
     this.profileService.getProfile().subscribe(
            data => {
              this.profile=data;
              if(data){
                this.editMode=true;
                this.action='Update';
              }
              this.url="/assets/uploads/"+data.clientImage
              this.imageName=data.clientImage;
            },
           error => console.error(error)
        );
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.url = event.target.result;
    }

    reader.readAsDataURL(event.target.files[0]);
  }

  //  this.product.photo = fileInput.target.files[0]['name'];
  }
  onSubmit(form:NgForm){
      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;
        if(files[0]==undefined && this.editMode===true){
          const profileData=new ProfileClient(this.imageName,form.value.age,form.value.description,form.value.phoneNumber,form.value.websiteLink,form.value.facebookLink,
           form.value.twitterLink,form.value.googleLink,form.value.linkedinLink,form.value.country,form.value.city,form.value.address);
        }
        else if(files[0]==undefined && this.editMode===false){
          const profileData=new ProfileClient('',form.value.age,form.value.description,form.value.phoneNumber,form.value.websiteLink,form.value.facebookLink,
           form.value.twitterLink,form.value.googleLink,form.value.linkedinLink,form.value.country,form.value.city,form.value.address);
        }
        else{
          formData.append("uploads[]", files[0], files[0]['name']);
          const profileData=new ProfileClient(files[0]['name'],form.value.age,form.value.description,form.value.phoneNumber,form.value.websiteLink,form.value.facebookLink,
           form.value.twitterLink,form.value.googleLink,form.value.linkedinLink,form.value.country,form.value.city,form.value.address);
        }
         var profile=JSON.stringify(profileData);
         formData.append("profile", profile);
        if(this.editMode===false){
          this.profileService.addProfile(formData)
             .subscribe(
                 data => console.log(data),
                error => console.error(error)
             );
        }
        else{
          console.log("update"+profile);
          this.profileService.updateProfile(formData)
             .subscribe(
                 data => console.log(data),
                error => console.error(error)
             );
        }
    //    this.router.navigate(['Employer/Profile']);

}

}
