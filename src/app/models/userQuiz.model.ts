export class UserQuiz {
    constructor(
        public id: number,
        public quizId: number,
        public userId: string,
        public takeDateTime: Date,
        public isStarted: boolean,
        public isSubmitted?: boolean,
        public result?: number,
        public quizTitle_EN?: string,
        public quizTitle_FR?: string,
    ) { }
}