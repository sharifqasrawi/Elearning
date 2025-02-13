import { Like } from './like.model';

export class Comment {
    constructor(
        public id: number,
        public courseId: number,
        public userId: string,
        public userFullName: string,
        public userGender: string,
        public text: string,
        public CommentDateTime: Date,
        public commentId?: number,
        public replies?: Comment[],
        public likes?: Like[]
    ) { }
}