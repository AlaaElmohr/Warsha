import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class UserAuthGuard implements CanActivate {

  constructor(private auth: AuthService) { }

  canActivate(){
     let type=this.auth.typeUser()
      if (type==='user') return true;

      return false
  }
}
