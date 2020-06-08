export class SessionContent {
    constructor(
        public id: number,
        public type: string,
        public content: string,
        public order: number,
        public note?: string,
        public content_FR?: string,

    ) { }
}