import {ProfileClient} from './profileClient.model';
export class Job {
    constructor(
                public title: string,
               public description: string,
               public categories: string,
                public salary: number,
               public jobType:string,
                public skills: [],
                public deadline: number,
                public country: string,
                public city: string,
                public address: string,
                public clientId?: string,
                public jobId?:string,
                public client?:ProfileClient,
                public complete?:boolean,
                public appCount?:Number
              ) {
              }
}
