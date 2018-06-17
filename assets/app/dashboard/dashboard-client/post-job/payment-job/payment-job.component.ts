import { Component, OnInit } from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-payment-job',
  templateUrl: './payment-job.component.html',
  styleUrls: ['./payment-job.component.scss']
})
export class PaymentJobComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
  }
  goNext(){
   this.router.navigate(['DashboardClient/Done']);
  }
}
