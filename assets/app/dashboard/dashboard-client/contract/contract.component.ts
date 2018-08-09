import { Component, OnInit } from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import { ContractService } from '../../../services/contract.service'
import { Contract } from "../../../models/contract.model";
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
  id;
  p: number = 1;
 contracts:Contract[];

constructor(private route:ActivatedRoute,private router:Router,private contractService:ContractService){}
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
   let clientId = localStorage.getItem('clientId');
  this.route.params.subscribe(params => {
       this.id = params['id'];
   this.contractService.getContracts('client').subscribe(
         (contracts: Contract[]) => {
             this.contracts=contracts;
         }
     );
});
}

finishContract(contract){
  console.log(contract);
  this.contractService.finishContract(contract)
      .subscribe(
          result => {
             this.router.navigate(['DashboardClient/FeedBackToUser', contract.contractId , 'client']);
           }
      );
}
}
