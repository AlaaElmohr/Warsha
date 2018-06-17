import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../services/header.service'

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {
  constructor(private headerService:HeaderService) { }
  ngOnInit() {
    this.headerService.addText('How It Works');
  }

}
