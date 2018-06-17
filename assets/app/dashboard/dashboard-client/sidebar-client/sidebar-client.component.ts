import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router , ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-sidebar-client',
  templateUrl: './sidebar-client.component.html',
  styleUrls: ['./sidebar-client.component.scss']
})
export class SidebarClientComponent implements OnInit {

  constructor(private authService:AuthService ,private router:Router) { }

  ngOnInit() {
  }
  logOut(){
    this.router.navigateByUrl('/Login');
    return this.authService.logout();
  }
}
