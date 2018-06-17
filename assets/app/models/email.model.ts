export class Email {
    constructor(
                public from: string,
                public to: string,
                public subject: string,
                public message: string,
                public password:string
                ) {}
}
