export class AppRating {
    constructor(
        public id: number,
        public userId: string,
        public value: number,
        public rateDateTime?: Date,
        public rateDateTimeUpdated?: Date,
    ){}
}