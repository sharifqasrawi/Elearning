export class Notification {
    constructor(
        public id: number,
        public type:string,
        public text:string,
        public info:string,
        public dateTime: Date,
        public isSeen: boolean
    ){}
}