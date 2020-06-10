export class Country {
    constructor(
        public id: number,
        public name_EN: string,
        public flagPath: string,
        public name_FR?: string
    ) { }
}