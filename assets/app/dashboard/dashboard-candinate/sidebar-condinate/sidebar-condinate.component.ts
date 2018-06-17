import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
@Component({
  selector: 'app-sidebar-condinate',
  templateUrl: './sidebar-condinate.component.html',
  styleUrls: ['./sidebar-condinate.component.scss']
})
export class SidebarCondinateComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }
  logOut(){
    return this.authService.logout();
  }
}
