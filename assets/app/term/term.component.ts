import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../services/header.service'

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss']
})
export class TermComponent implements OnInit {
  constructor(private headerService:HeaderService) { }
  ngOnInit() {
    this.headerService.addText('Term And Conditions');
  }

}
