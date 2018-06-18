import {User} from './user.model';
import {Client} from './client.model';
import {FeedBack} from './feedback.model';
export class Contract {
    constructor(
              public title?: string,
              public startTime?: Date,
              public finishTime?: Date,
              public budget?: number,
              public status?: string,
              public user?:User,
              public contractId?:string,
              public jobId?:string,
              public client?:Client,
              public feedback?:FeedBack[]
              ) {
              }
}
