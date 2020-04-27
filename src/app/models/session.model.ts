export class Session {
    constructor(
        public id: number,
        public title_EN: string,
        public slug_EN: string,
        public order: number,
        public duration: number,
        public createdAt?: Date,
        public createdBy?: string,
        public updatedAt?: Date,
        public updatedBy?: string,
        public sectionId?: number,
        public courseId?: number
    ){}
}