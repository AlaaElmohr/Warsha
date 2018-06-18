import {User} from './user.model';
import {Job} from '../models/job.model';

export class Application {
    constructor(
               public coverLetter: string,
              public bid: number,
              public duration: number,
              public job?:Job,
              public user?:User,
              public appId?:string,
              public status?:string,
              public contractId?:string
              ) {
              }
}
