import { Question } from './question.model';

export class Quiz {
    constructor(
        public id: number,
        public title_EN: string,
        public slug_EN: string,
        public description_EN: string,
        public imagePath: string,
        public languages: string,
        public duration?: number,
        public isPublished?: boolean,
        public publishDateTime?: Date,
        public createdAt?: Date,
        public createdBy?: string,
        public updatedAt?: Date,
        public updatedBy?: string,
        public deletedAt?: Date,
        public deletedBy?: string,
        public questions?: Question[],
        public title_FR?: string,
        public slug_FR?: string,
        public description_FR?: string,
    ) { }
}