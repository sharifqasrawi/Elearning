export class Favorite{
    constructor(
        public id: number,
        public userId: string,
        public courseId?: number,
    ){}
}