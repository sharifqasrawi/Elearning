export class SavedSession {
    constructor(
        public id: number,
        public userId: string,
        public sessionId?: number,
        public sessionUrl?: string,
        public saveDateTime?: Date,
        public order?: number,
        public title_EN?: string,
        public duration?: number,
        public courseTitle_EN?: string,
        public courseTitle_FR?: string
    ) { }
}