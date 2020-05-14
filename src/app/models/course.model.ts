import { Class } from './class.model';
import { Like } from './like.model';
import { Section } from './section.model';
import { Tag } from './tag.model';
import { Category } from './category.model';
//import { User } from './user.model';

export class Course {
    constructor(
        public id: number,
        public title_EN: string,
        public slug_EN: string,
        public description_EN: string,
        public prerequisites_EN: string,
        public languages: string,
        public level: string,
        public duration: number,
        public imagePath: string,
        public isFree: boolean,
        public price: number,
        public isPublished: boolean,
        public createdBy?: string,
        public updatedBy?: string,
        public createdAt?: Date,
        public updatedAt?: Date,
        public publishedAt?: Date,
        public deletedAt?: Date,
        public deletedBy?: string,
        //public author?: User,
        public category?: Category,
        public tags?: Tag[],
        public sections?: Section[],
        public likes?: Like[],
        public cls?: Class,
    ) { }
}