import { Injectable } from "@angular/core";

@Injectable()
export class HeaderService{
  text:string;
    constructor() {}
    addText(text:string){
      this.text=text;
    }
    getText(){
       return this.text
    }

}
