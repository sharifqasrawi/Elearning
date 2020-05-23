export class DoneSession {
    constructor(
        public id: number,
        public sessionId: number,
        public userId: string,
        public doneDateTime?: Date
    ) { }
}