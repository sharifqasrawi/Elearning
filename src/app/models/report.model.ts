export class Report {
    constructor(
        public id: number,
        public userFullName: string,
        public severity: string,
        public severityLevel: string,
        public type: string,
        public description: string,
        public userId?: string,
        public reportDateTime?: Date,
        public isSeen?: boolean
    ) { }
}