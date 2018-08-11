import { Comment  } from './comment.model';
import { User } from './user.model';

export class Post {
    constructor(
            public  postImage:string,
            public title: any[],
             public description:any[],
             public categories: string,
             public tags: any[],
             public time: Date,
              public postId?:string,
              public userId?: User,
              public comments?: Comment[],
              public userName?: string,
              public userImage?:string,
              public commentsCount?:number

              ) {
              }
}
