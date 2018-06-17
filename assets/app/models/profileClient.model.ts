export class ProfileClient {
    constructor(
               public  clientImage?:string,
               public age?: number,
                public description?: string,
                public phoneNumber?: number,
                public websiteLink?: string,
                public facebookLink?: string,
                public twitterLink?: string,
                public googleLink?: string,
                public linkedinLink?: string,
                public country?: string,
                public city?: string,
                public address?: string,
                public name?:string,
                public email?:string,
                public memberSince?:Date,

              ) {
              }
}
