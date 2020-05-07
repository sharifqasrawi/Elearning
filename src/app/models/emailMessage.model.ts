export class EmailMessage {
    constructor(
        public id?: number,
        public emails?: string,
        public subject?: string,
        public message?: string,
        public sendDateTime?: Date
    ) { }
}