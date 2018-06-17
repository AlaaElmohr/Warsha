import { Component, OnInit ,Output ,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navber-mobile',
  templateUrl: './navber-mobile.component.html',
  styleUrls: ['./navber-mobile.component.scss']
})
export class NavberMobileComponent implements OnInit {
hideNavebar=false;
counter=1;
//@Output() notifi=new EventEmitter<number>();
  constructor(){

  }
closeDialog(){
  this.counter=this.counter+1;
  this.hideNavebar=true;
//  this.notifi.emit(this.counter);
//  console.log(this.notifi.emit(this.counter));
}
  ngOnInit() {
  }

}
