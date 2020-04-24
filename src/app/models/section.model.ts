export class Section {
    constructor(
        public id: number,
        public order:number,
        public name_EN: string,
        public slug_EN: string,
        public createdAt?: Date,
        public createdBy?: string,
        public updatedAt?: Date,
        public updateddBy?: string,
        public deletedAt?: Date,
        public deletedBy?: string,
    ){}
}