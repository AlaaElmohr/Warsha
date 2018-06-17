import { Component, OnInit } from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
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
  FromToDate: string[] = [];
  languages = [];
  url;
  category;
  imageName;
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
   if (event.target.files && event.target.files[0]) {
     var reader = new FileReader();

     reader.onload = (event:any) => {
       this.url = event.target.result;
     }

     reader.readAsDataURL(event.target.files[0]);
   }

   //  this.product.photo = fileInput.target.files[0]['name'];
   }
   ngOnInit(){
     let id=localStorage.getItem('userId');
      this.profileUserService.getProfile(id).subscribe(
             data => {
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
               this.educationFrom=new Date(data.educationFrom);
               this.educationTo=new Date(data.educationTo);
               this.workFrom=new Date(data.workFrom);
               this.workTo=new Date(data.workTo);

               this.url="/assets/uploads/"+data.userImage;
               this.imageName=data.userImage;
             },
            error => console.error(error)
         );
   }
onSubmit(form:NgForm){
      const formData: any = new FormData();
      const files: Array<File> = this.filesToUpload;
      let categoryValue;
      for( let category of this.categories){
        if(category.value=== form.value.categories){
           categoryValue=category.viewValue;
        }
      }
      if(files[0]==undefined && this.editMode===true){
        const profileData=new ProfileUser(this.imageName,form.value.jobTitle,form.value.educationLevel,form.value.age,this.languages,form.value.experience,form.value.coverLetter,form.value.phoneNumber,form.value.websiteLink,form.value.facebookLink,
        form.value.twitterLink,form.value.googleLink,form.value.linkdinLink,form.value.country,form.value.city,form.value.address,categoryValue,form.value.educationTitle,this.FromToDate[0],this.FromToDate[1],form.value.educationInstitue,
        form.value.educationDescription,form.value.workTitle,this.FromToDate[2],this.FromToDate[3],form.value.workCompany,form.value.workDescription);
      }
      else if(files[0]==undefined && this.editMode===false){
        const profileData=new ProfileUser('',form.value.jobTitle,form.value.educationLevel,form.value.age,this.languages,form.value.experience,form.value.coverLetter,form.value.phoneNumber,form.value.websiteLink,form.value.facebookLink,
        form.value.twitterLink,form.value.googleLink,form.value.linkdinLink,form.value.country,form.value.city,form.value.address,categoryValue,form.value.educationTitle,this.FromToDate[0],this.FromToDate[1],form.value.educationInstitue,
        form.value.educationDescription,form.value.workTitle,this.FromToDate[2],this.FromToDate[3],form.value.workCompany,form.value.workDescription);
      }
      else{
        formData.append("uploads[]", files[0], files[0]['name']);
        const profileData=new ProfileUser(files[0]['name'],form.value.jobTitle,form.value.educationLevel,form.value.age,this.languages,form.value.experience,form.value.coverLetter,form.value.phoneNumber,form.value.websiteLink,form.value.facebookLink,
        form.value.twitterLink,form.value.googleLink,form.value.linkdinLink,form.value.country,form.value.city,form.value.address,categoryValue,form.value.educationTitle,this.FromToDate[0],this.FromToDate[1],form.value.educationInstitue,
        form.value.educationDescription,form.value.workTitle,this.FromToDate[2],this.FromToDate[3],form.value.workCompany,form.value.workDescription);
      }
      var profile=JSON.stringify(profileData);
      formData.append("profile", profile);
      if(this.editMode===false){
        this.profileUserService.addProfile(formData)
           .subscribe(
               data => console.log(data),
              error => console.error(error)
           );
      }
      else{
        console.log("update"+profile);
        this.profileUserService.updateProfile(formData)
           .subscribe(
               data => console.log(data),
              error => console.error(error)
           );
      }
 this.router.navigate(['Candinate/Profile']);

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
       this.language.splice(index, 1);
     }
   }
   addCategory(event: MatChipInputEvent): void {

     let input = event.input;
     let value = event.value;
     if ((value || '').trim()) {
       this.categories.push(value.trim());
     }
     if (input) {
       input.value = '';
     }
   }
   removeCategory(value: any): void {
     let index = this.categories.indexOf(value);
     if (index >= 0) {
      this.categories.splice(index, 1);
     }
   }

}
