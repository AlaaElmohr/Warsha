import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {User} from '../../models/user.model'
import {UserService} from '../../services/user.service'
import {HeaderService} from '../../services/header.service';
import {Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-candinate-list',
  templateUrl: './candinate-list.component.html',
  styleUrls: ['./candinate-list.component.scss']
})
export class CandinateListComponent implements OnInit{
  users:User[];
  panelOpenState: boolean = false;
  p: number = 1;
  filterCategory=[];
  filterRate=[];
  checked;
  stars=[1,2,3,4,5];
  filter={city:'',category:[],rate:[]};
  userImage=[];
  categories = [ 'Plumber','Carpenter','Wall Painter','Electricians','Television Engineer','Refrigeration Engineer','Air Conditioning Engineer','Washing Machine Engineer'];
  constructor(private userService:UserService,private headerService:HeaderService,private router:Router) { }
  ngOnInit(){
    this.headerService.addText('Candinate List');
  this.userService.getUsers('').subscribe(
      (users: User[]) => {
          this.users= users;
            console.log(users);
          for(let user of users){
            if(!user.profile.userImage){
              this.userImage.push("/assets/uploads/noImage.png");
            }
            this.userImage.push("/assets/uploads/"+user.profile.userImage);
          }
      }
  );
  }
  visitProfile(user){
    this.router.navigate(['Candinate/Profile/', user._id]);
  }
  getStars(number){
    if(number%2 != 0){
      number=Math.ceil(number);
    }
    return new Array(number);
  }
  search(name){
    console.log(name);
    if(name===''){
      this.userService.getUsers('').subscribe(
          (users: User[]) => {
            console.log(users.length);
              this.users= users;
          }
      );
    }
    this.userService.getUser(name,'name').subscribe(
        (users: User[]) => {
          console.log(users.length);
            this.users= users;
        }
    );
  }
  filterUser(by,value,e){
   if(by===0){
  this.filter.city=value;
  }
  if(by=== 1){
    if(e.checked==true){
      this.filterCategory.push(value);
      this.filter.category=this.filterCategory;
      console.log(e);
    }
    if(e.checked==false){
      this.filterCategory.splice(this.filterCategory.indexOf(value),1);
      this.filter.category=this.filterCategory;
      console.log(e);
    }
  }
  if(by=== 2){
    if(e.checked==true){
      this.filterRate.push(value);
      this.filter.rate=this.filterRate;
      console.log(e);
    }
    if(e.checked==false){
      this.filterRate.splice(this.filterRate.indexOf(value),1);
      this.filter.rate=this.filterRate;
      console.log(e);
    }
  }
   this.userService.getUsers(this.filter).subscribe(
       (users: User[]) => {
         console.log(users.length);
           this.users= users;
       }
   );
  }
}
