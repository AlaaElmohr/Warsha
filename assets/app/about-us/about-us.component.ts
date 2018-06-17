import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../services/header.service'
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  constructor(private headerService:HeaderService) { }
  ngOnInit() {
    this.headerService.addText('About Us');
  }

}
