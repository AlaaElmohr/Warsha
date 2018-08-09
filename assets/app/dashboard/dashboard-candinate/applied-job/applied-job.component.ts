import { Component, OnInit } from '@angular/core';
import {ContractService} from '../../../services/contract.service';
import { FeedBack } from "../../../models/feedback.model";
import { NgForm } from "@angular/forms";
import { Router,ActivatedRoute  } from "@angular/router";
import {Contract} from '../../../models/contract.model';
@Component({
  selector: 'app-applied-job',
  templateUrl: './applied-job.component.html',
  styleUrls: ['./applied-job.component.scss']
})
export class AppliedJobComponent implements OnInit {
  contracts:Contract[]=[];
  feedback:FeedBack;
  p: number = 1;

 constructor(private router:Router,private contractService:ContractService){}
 isInteger(value){
   return Number.isInteger(value)
 }
 getStars(number){
  if( !this.isInteger(number) ){
    number=Math.floor(number);
  }
  return new Array(number);
 }
 ngOnInit(){
   const userId = localStorage.getItem('userId');
    this.contractService.getContracts('user').subscribe(
          (contracts: Contract[]) => {
            for( let contract of contracts){
              if( contract.status === 'finished'  ){
                console.log(contract)
                this.contracts.push(contract);
               }
            }
          }
        );
 }
 goTo(contract){
   this.router.navigate(['DashboardUser/FeedBackToClient', contract.contractId , 'user']);
 }

}
