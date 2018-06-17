import { Component, OnInit } from '@angular/core';
import {HeaderService} from '../services/header.service'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  constructor(private headerService:HeaderService) { }
  ngOnInit() {
    this.headerService.addText('Blog');
  }
}
