export class Class {
    constructor(
        public id: string,
        public name_EN: string,
        public courseId: number,
        public members: Member[]
    ) { }
}

export class Member {
    constructor(
        public id: string,
        public fullName: string,
        public gender: string,
        public country: string,
        public email: string,
        public enrollDateTime: Date,
        public currentSessionId?: number,
        public currentSessionSlug?: string
    ) { }
}