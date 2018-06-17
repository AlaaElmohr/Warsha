import {ProfileUser} from './profileUser.model';
import {Contract} from './contract.model';

export class User {
    constructor(
              public  name?: string,
              public  email?: string,
              public  memberSince?: Date,
              public profile?:ProfileUser,
              public jobDoneCount?:number,
              public totalEarned?:number,
              public stars?:number,
              public contracts?:Contract[],
              public id?:string
              ) {
              }
}
