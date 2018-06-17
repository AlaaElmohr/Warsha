import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../../services/header.service';

@Component({
  selector: 'app-employer-list',
  templateUrl: './employer-list.component.html',
  styleUrls: ['./employer-list.component.scss']
})
export class EmployerListComponent implements OnInit {

  panelOpenState: boolean = false;
  p: number = 1;
  collection: any[] = [1,2,4,5,6,7,7,9,9,9,9,9,9,9,9,9,1,2,4,5,6,7,7,9,9,9,9,9,9,9,9,9,1,2,4,5,6,7,7,9,9,9,9,9,9,9,9,9,1,2,4,5,6,7,7,9,9,9,9,9,9,9,9,9];
  constructor(private headerService:HeaderService) { }

  ngOnInit() {
    this.headerService.addText('Employer List');

  }

}
