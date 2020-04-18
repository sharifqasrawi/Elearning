export class Category {

    constructor(
        public id: number,
        public title_EN: string,
        public slug?: string,
        public imagePath?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public createdBy?: string,
        public updatedBy?: string,
        public deletedAt?: Date,
        public deletedBy?: string,
    ) { }
}