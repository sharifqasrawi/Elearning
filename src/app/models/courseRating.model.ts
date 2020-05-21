export class CourseRating {
    constructor(
        public id: number,
        public courseId: number,
        public userId: string,
        public value: number,
        public oldValue?: number,
        public userName?:string,
        public userGender?:string,
        public userCountry?:string,
        public rateDateTime?: Date,
        public rateDateTimeUpdated?: Date,
    ) { }
}