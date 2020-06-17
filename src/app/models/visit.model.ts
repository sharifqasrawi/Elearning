export class Visit {
    constructor(
        public id: number,
        public ipAddress: string,
        public browserInfo: string,
        public continent_Code: string,
        public continent_Name: string,
        public country_Code: string,
        public country_Name: string,
        public region_Code: string,
        public region_Name: string,
        public city: string,
        public zip: string,
        public latitude: string,
        public longitude: string,
        public dateTime: Date,
        public dayVisitsCount: number
    ) { }
}