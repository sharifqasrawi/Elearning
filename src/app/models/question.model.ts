import { Answer } from './answer.model';

export class Question {
    constructor(
        public id: number,
        public text_EN: string,
        public slug_EN: string,
        public imagePath: string,
        public quizId: number,
        public duration?: number,
        public createdAt?: Date,
        public createdBy?: string,
        public updatedAt?: Date,
        public updatedBy?: string,
        public deletedAt?: Date,
        public deletedBy?: string,
        public answers?: Answer[],
        public text_FR?: string,
        public slug_FR?: string,
    ) { }
}