import {Profile} from './user.model';
import {Job} from '../models/job.model';

export class Application {
    constructor(
               public coverLetter: string,
              public bid: number,
              public duration: number,
              public job?:Job,
              public user?:Profile,
              public appId?:string,
              public status?:string,
              public contractId?:string
              ) {
              }
}
