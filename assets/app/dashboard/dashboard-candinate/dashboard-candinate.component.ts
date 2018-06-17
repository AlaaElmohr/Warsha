import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute , NavigationEnd} from '@angular/router'
import {HeaderService} from '../../services/header.service';

@Component({
  selector: 'app-dashboard-candinate',
  templateUrl: './dashboard-candinate.component.html',
  styleUrls: ['./dashboard-candinate.component.scss']
})
export class DashboardCandinateComponent implements OnInit {
displayVar=false;
constructor(private headerService:HeaderService) { }
ngOnInit() {
  this.headerService.addText('DashBoard');
}

}
