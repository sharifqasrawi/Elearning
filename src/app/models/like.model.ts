export class Like {
    constructor(
        public id: number,
        public courseId: number,
        public userId: string,
        public userFullName: string,
        public likeDateTime: Date
    ) { }

}