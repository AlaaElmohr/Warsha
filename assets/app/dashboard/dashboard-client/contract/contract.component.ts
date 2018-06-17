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
getStars(number){
  return new Array(number);
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
