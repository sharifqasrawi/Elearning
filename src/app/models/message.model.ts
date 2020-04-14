export class Message {

    constructor(
        public id: number,
        public name: string,
        public email: string,
        public subject: string,
        public text: string,
        public dateTime?: Date,
        public userId?: string,
        public isSeen?: boolean,
        public seenDateTime?: Date
    ) { }
}