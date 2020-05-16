export class SavedSession {
    constructor(
        public id: number,
        public userId: string,
        public sessionId?: number,
        public saveDateTime?: Date
    ) { }
}