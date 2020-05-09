export class Like {
    constructor(
        public id: number,
        public userId: string,
        public userFullName: string,
        public likeDateTime: Date,
        public courseId?: number,
        public commentId?: number,
    ) { }

}