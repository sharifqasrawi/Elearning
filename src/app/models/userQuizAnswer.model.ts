export class UserQuizAnswer {
    constructor(
        public id: number,
        public userQuizId: number,
        public questionId: number,
        public answerId: number,
        public chooseDateTime?: Date
    ) { }
}