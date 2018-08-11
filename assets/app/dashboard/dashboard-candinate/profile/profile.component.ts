import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent,MatDatepickerInputEvent} from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import {ProfileUser} from "../../../models/profileUser.model";
import {ProfileUserService} from '../../../services/profileUser.service'
import { NgForm } from "@angular/forms";
import {Router , ActivatedRoute} from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  constructor(private profileUserService:ProfileUserService,private router:Router,private http:Http) {}
  filesToUpload: Array<File> = [];
  visible: boolean = true;
   selectable: boolean = true;
   removable: boolean = true;
   addOnBlur: boolean = true;
  FromToDate: any[] = [];
  languages = [];
  url;
  imageName;
  category;
  workTo;workFrom;educationTo;educationFrom;
//  categories= [];
  profile:ProfileUser;
  editMode=false;
  action='Set';
  categories = [
   {value: '0', viewValue: 'Plumber'},
   {value: '1', viewValue: 'Carpenter'},
   {value: '2', viewValue: 'Wall Painter'},
   {value: '3', viewValue: 'Electricians'},
   {value: '4', viewValue: 'Television Engineer'},
   {value: '5', viewValue: 'Refrigeration Engineer'},
   {value: '6', viewValue: 'Air conditioning Engineer'},
   {value: '7', viewValue: 'Washing machine Engineer'}
  ];
   // Enter, comma
   separatorKeysCodes = [ENTER, COMMA];
   addEvent(index,event: MatDatepickerInputEvent<Date>) {
         this.FromToDate.splice(index,0,` ${event.value}`);
   }
   fileChangeEvent(fileInput: any) {
     this.filesToUpload = <Array<File>>fileInput.target.files;
   if (fileInput.target.files && fileInput.target.files[0]) {
     var reader = new FileReader();

     reader.onload = (event:any) => {
       this.url = event.target.result;
     }
     reader.readAsDataURL(fileInput.target.files[0]);
   }

   //  this.product.photo = fileInput.target.files[0]['name'];
   }
   ngOnInit(){
     let id=localStorage.getItem('userId');
      this.profileUserService.getProfile(id).subscribe(
             data => {
               if(data != undefined){
               this.profile=data;
               if(data.jobTitle){
                 this.editMode=true;
                 this.action='Update';
               }
               for(let languages of data.languages){
                  this.languages.push(languages);
               }
               for(let category of this.categories ){
                 if(category.viewValue === data.categories){
                   this.category=category.value;
                 }
               }
              if(data.workFrom != null && data.educationFrom != null) {
               this.educationFrom=new Date(parseInt(data.educationFrom.toString()));
               this.educationTo=new Date(parseInt(data.educationTo.toString()));
               this.workFrom=new Date(parseInt(data.workFrom.toString()));
               this.workTo=new Date(parseInt(data.workTo.toString()));
             }

                if(data == undefined){
               this.url="/assets/uploads/"+data.userImage;
                 this.imageName=data.userImage;
               }
             }
             },

            error => console.error(error)
         );
   }
onSubmit(form:NgForm){
      let profileData;
      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;
      let categoryValue;
      for( let category of this.categories){
        if(category.value=== form.value.categories){
           categoryValue=category.viewValue;
        }
      }
      let indexes=[0,1,2,3];
      let dateValues=[this.educationFrom,this.educationTo,this.workFrom,this.workTo];
      for(let i of indexes){
      if(this.editMode===true && (this.FromToDate[i]=='' || this.FromToDate[i]==undefined)){
        this.FromToDate[i]=Date.parse(dateValues[i]);
      }
    }
      if(files[0]==undefined && this.editMode===true){
         profileData=new ProfileUser(this.imageName,form.value.jobTitle,form.value.educationLevel,form.value.age,this.languages,form.value.experience,form.value.coverLetter,form.value.phoneNumber,form.value.websiteLink,form.value.facebookLink,
        form.value.twitterLink,form.value.googleLink,form.value.linkdinLink,form.value.country,form.value.city,form.value.address,categoryValue,form.value.educationTitle,this.FromToDate[0],this.FromToDate[1],form.value.educationInstitue,
        form.value.educationDescription,form.value.workTitle,this.FromToDate[2],this.FromToDate[3],form.value.workCompany,form.value.workDescription);
      }
      else if(files[0]==undefined && this.editMode===false){
         profileData=new ProfileUser('',form.value.jobTitle,form.value.educationLevel,form.value.age,this.languages,form.value.experience,form.value.coverLetter,form.value.phoneNumber,form.value.websiteLink,form.value.facebookLink,
        form.value.twitterLink,form.value.googleLink,form.value.linkdinLink,form.value.country,form.value.city,form.value.address,categoryValue,form.value.educationTitle,this.FromToDate[0],this.FromToDate[1],form.value.educationInstitue,
        form.value.educationDescription,form.value.workTitle,this.FromToDate[2],this.FromToDate[3],form.value.workCompany,form.value.workDescription);
      }
      else{
        formData.append("uploads[]", files[0], files[0]['name']);
        profileData=new ProfileUser(files[0]['name'],form.value.jobTitle,form.value.educationLevel,form.value.age,this.languages,form.value.experience,form.value.coverLetter,form.value.phoneNumber,form.value.websiteLink,form.value.facebookLink,
        form.value.twitterLink,form.value.googleLink,form.value.linkdinLink,form.value.country,form.value.city,form.value.address,categoryValue,form.value.educationTitle,this.FromToDate[0],this.FromToDate[1],form.value.educationInstitue,
        form.value.educationDescription,form.value.workTitle,this.FromToDate[2],this.FromToDate[3],form.value.workCompany,form.value.workDescription);
      }
      var profile=JSON.stringify(profileData);
      formData.append("profile", profile);
      if(this.editMode===false){
        this.profileUserService.addProfile(formData)
           .subscribe(
               data => {console.log(data); this.router.navigateByUrl('Candinate/Profile')},
              error => console.error(error)
           );
      }
      else{
        console.log("update"+profile);
        this.profileUserService.updateProfile(formData)
           .subscribe(
               data => {console.log(data); this.router.navigateByUrl('Candinate/Profile')},
              error => console.error(error)
           );
      }


}

   addLanguage(event: MatChipInputEvent): void {
     let input = event.input;
     let value = event.value;
     if ((value || '').trim()) {
       this.languages.push(value.trim());
     }
     if (input) {
       input.value = '';
     }
   }
   removeLanguage(value: any): void {
     let index = this.languages.indexOf(value);
     if (index >= 0) {
       this.languages.splice(index, 1);
     }
   }


}
