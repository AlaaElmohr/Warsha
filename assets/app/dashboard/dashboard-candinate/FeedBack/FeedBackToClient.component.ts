import { Component, OnInit , ElementRef ,ViewChild , AfterViewInit , Renderer} from '@angular/core';
import { FeedBack } from "../../../models/feedback.model";
import { NgForm } from "@angular/forms";
import { Router,ActivatedRoute  } from "@angular/router";
import { ContractService } from '../../../services/contract.service';
@Component({
  selector: 'app-FeedBackToClient',
  templateUrl: './FeedBackToClient.component.html',
  styleUrls: ['./FeedBackToClient.component.scss']
})
export class FeedBackToClientComponent implements OnInit {
  @ViewChild('starsRef') StarsRef: ElementRef;

  constructor(private route: ActivatedRoute ,private contractService: ContractService,private router:Router ,private element: ElementRef, private renderer: Renderer) {
  }
id;
type;
stars;
value;
// /stars;
getStars=[5,4,3,2,1];
rate(value){
  let newValue=0;
  let newTarget;
  let sum=0;
  this.stars=value;
  this.value=value;
  console.log(this.value);
 let myStars = { 0.5:2, 1:5, 1.5:8 ,2:11,2.5:14,3:17,3.5:20,4:23,4.5:26,5:29};
let numbers=[0.5,1,1.5,2,2.5,3,3.5,4,4.5,5];
for( let j=0;j<10;j++){
  if(value==numbers[j]){

  for(let k=0;k<=j;k++){
     newValue=numbers[k]-newValue;
     if(k=j){
       newValue=numbers[k]-0.5;
     }
  }
}
}
newTarget=5-newValue;
console.log(myStars[newTarget]);
  for(let i =myStars[newTarget]; i <= 29 ;i=i+3){
    this.renderer.setElementStyle(this.StarsRef.nativeElement.childNodes[i], "color", "#FFD700");
    if(i==29){
      for( let j=2;j<=myStars[newTarget-0.5];j=j+3){
        this.renderer.setElementStyle(this.StarsRef.nativeElement.childNodes[ j], "color", "#DDD");
        console.log("333");
      }
    }
  }
  value=0;
  newValue=0;
  newTarget=0;
  this.value=0;
}
isInteger(value){
  return Number.isInteger(value)
}
  onSubmit(form:NgForm){

   const feedback=new FeedBack(this.stars,form.value.comment);
   this.contractService.addFeedBack(this.id,feedback,this.type)
      .subscribe(
         data => console.log(data),
         error => console.error(error)
      );
  this.router.navigate(['DashboardUser/AppliedJobs']);
 form.reset();
}

ngOnInit(){

  this.route.params.subscribe(params => {
       this.id = params['id'];
       this.type = params['type'];
       console.log("type"+this.type)
    });
}
}
