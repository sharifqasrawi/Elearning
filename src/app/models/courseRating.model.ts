export class CourseRating {
    constructor(
        public id: number,
        public courseId: number,
        public userId: string,
        public value: number,
        public rateDateTime?: Date,
        public rateDateTimeUpdated?: Date,
    ) { }
}