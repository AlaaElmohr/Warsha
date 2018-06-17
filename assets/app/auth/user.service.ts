import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database'
@Injectable()
export class UserService {

  constructor(private db:AngularFireDatabase) { }
save(value){
   this.db.list('/users').push(value);
}
}
