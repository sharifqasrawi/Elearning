import { Session } from './session.model';
export class Section {
    constructor(
        public id: number,
        public order:number,
        public name_EN: string,
        public slug_EN: string,
        public createdAt?: Date,
        public createdBy?: string,
        public updatedAt?: Date,
        public updatedBy?: string,
        public deletedAt?: Date,
        public deletedBy?: string,
        public sessions?: Session[],
        public name_FR?: string,
        public slug_FR?: string,
    ){}
}