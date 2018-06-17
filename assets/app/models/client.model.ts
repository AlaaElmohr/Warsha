import {ProfileClient} from './profileClient.model';
import {Contract} from './contract.model';
export class Client {
    constructor(
                public name: string,
                public  email?: string,
                public  memberSince?: Date,
               public profile?:ProfileClient,
               public jobPostedCount?:number,
                public jobDoneCount?:number,
                public totalSpent?:number,
                public stars?:number,
                public contracts?:Contract[],
               public id?:string,
              ) {
                this.id=localStorage.getItem('clientId');
              }
}
