export class Comment {
    constructor(
             public description: string,
             public time: Date,
            public userName?: string,
            public userImage?:string,
            public email?: string   ,
             public commentId?:string,
              public postId?:string,
              public userId?: string
              ) {
              }
}
