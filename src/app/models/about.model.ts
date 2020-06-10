export class About {
    constructor(
        public id: number,
        public name: string,
        public title: string,
        public imagePath: string,
        public info: string,
        public email1: string,
        public email2?: string,
        public website?: string,
        public info_FR?: string,
        public title_FR?: string,
        public phoneNumber?: string
    ) { }
}