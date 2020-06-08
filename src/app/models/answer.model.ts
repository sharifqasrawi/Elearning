export class Answer {
    constructor(
        public id: number,
        public text_EN: string,
        public imagePath: string,
        public questionId: number,
        public isCorrect?: boolean,
        public createdAt?:Date,
        public createdBy?:string,
        public updatedAt?:Date,
        public updatedBy?:string,
        public deletedAt?:Date,
        public deletedBy?:string,
        public text_FR?: string,
        ) { }
}