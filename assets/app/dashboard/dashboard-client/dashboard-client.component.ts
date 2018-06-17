import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../../services/header.service';


@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.scss']
})
export class DashboardClientComponent implements OnInit {
  constructor(private headerService:HeaderService) { }
  ngOnInit() {
    this.headerService.addText('Dashboard');
  }

}
