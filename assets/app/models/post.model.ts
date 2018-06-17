import { Comment  } from './comment.model';
export class Post {
    constructor(
             public title: [],
             public description:[],
             public categories: string,
             public tags: [],
             public time: Date,
              public postId?:string,
              public userId?: string,
              public comments?: Comment[],
              public userName?: string,
              public commentsCount?:number
              ) {
              }
}
