import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router,ActivatedRoute  , Params} from "@angular/router";
import { PostService } from '../../services/post.service';
import { Post } from "../../models/post.model";
import {MatChipInputEvent,MatDatepickerInputEvent } from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { FormGroup,FormControl,FormArray ,Validators} from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  id;
  url;
  imageName;
 description:any[]=[];
  title:any[]=[];
 editMode=false;
 visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  tags = [];
  action='Set';
  CreatePost : FormGroup;
  editModeAction:string;
  filesToUpload: Array<File> = [];
FromToDate;
  constructor(private postService: PostService, private route: ActivatedRoute,private router: Router ) {}
  addTag(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }
    if (input) {
      input.value = '';
    }
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
  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];
  addEvent(index,event: MatDatepickerInputEvent<Date>) {
        this.FromToDate.splice(index,0,` ${event.value}`);
  }
  removeTag(value: any): void {
    let index = this.tags.indexOf(value);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
ngOnInit() {
  this.route.params.subscribe( (params:Params)=>{
     this.id= params['id'];
     if(params['id']){
       this.editMode=true;
     }
      this.initForm();
      });
      if(this.editMode){
       this.editModeAction="Edit";
      }
      else{
      this.editModeAction="Add";
      }

}
addMore(){
(<FormArray>this.CreatePost.get('titleAndDesc')).push( new FormGroup({
'title':new FormControl(),
'description' :new FormControl()
}));
}
private initForm(){
  let categories= '' ;
  let titleAndDescription = new FormArray([]);
      if(this.editMode===true){
        this.postService.getPostById(this.id).subscribe(
          data => {
            const post=data;
            categories=post.categories;
            let postInfo=[];
            for(let i in post.title){
              postInfo.push({title:post.title[i],description:post.description[i]});
            }
            for(let tags of post.tags){
               this.tags.push(tags);
            }
            for (let i in postInfo){
              titleAndDescription.push(
                new FormGroup({
                'title' : new FormControl(postInfo[i].title),
               'description' :new FormControl(postInfo[i].description)
              })
              );
            }
          }
        );
      }
      if(this.editMode === false){
        titleAndDescription.push(
          new FormGroup({
          'title' : new FormControl(''),
         'description' :new FormControl('')
        })
        );
      }
  this.CreatePost = new FormGroup({
     'categories' : new FormControl(categories),
    'titleAndDesc' : titleAndDescription
  });
}
submit(){
  const formData: any = new FormData();
  let postData;
  const files: Array<File> = this.filesToUpload;
   const categories=this.CreatePost.value['categories'];
    const titleAndDesc =this.CreatePost.value['titleAndDesc'].slice();
    for(let post of titleAndDesc){
      this.title.push(post.title);
      this.description.push(post.description);
    }

      if(files[0]==undefined && this.editMode===true){
        console.log("1");
         postData= new Post(this.imageName,this.title,this.description,categories,this.tags,new Date());
      }
     else if(files[0]==undefined && this.editMode===false){
         console.log("2");
       postData= new Post('',this.title,this.description,categories,this.tags,new Date());
     }
     else{
         console.log("3");
         formData.append("uploads[]", files[0], files[0]['name']);
        postData= new Post(files[0]['name'],this.title,this.description,categories,this.tags,new Date());

     }
     var post=JSON.stringify(postData);
     formData.append("post", post);
  if(this.editMode==false){
    this.postService.addPost(formData)
       .subscribe(
           data => console.log(data),
          error => console.error(error)
       );
  }
  else{
    this.postService.updatePost(formData,this.id)
       .subscribe(
           data => console.log(data),
          error => console.error(error)
       );
  }
 this.CreatePost.reset();
}
}
