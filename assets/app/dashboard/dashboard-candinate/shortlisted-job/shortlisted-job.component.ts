import { Component, OnInit } from '@angular/core';
import {ContractService} from '../../../services/contract.service';
import {Contract} from '../../../models/contract.model';
import {Router} from '@angular/router';
@Component({
  selector: 'app-shortlisted-job',
  templateUrl: './shortlisted-job.component.html',
  styleUrls: ['./shortlisted-job.component.scss']
})
export class ShortlistedJobComponent implements OnInit {
  p: number = 1;

  contracts:Contract[]=[];
 constructor(private router:Router,private contractService:ContractService){}
 ngOnInit(){
    this.contractService.getContracts('user').subscribe(
          (contracts: Contract[]) => {
            for( let contract of contracts){
              if( contract.status === 'opened'  ){
                console.log(contract)
                this.contracts.push(contract);
               }
            }
          }
        );
 }
 goToContract(contract){
//   this.router.navigate(['DashboardUser//MyApplication/', app.appId]);
 }
}
