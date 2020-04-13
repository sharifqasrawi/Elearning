export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public country: string,
        public gender: string,
        public isAdmin: boolean,
        public isAuthor: boolean,
        public id: string,
        private _token?: string,
        private _tokenExpirationDate?: Date,
        public emailConfirmed?: boolean,
        public createdAt?: Date,
        public isActive?: boolean
    )
    {}

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
          return null;
        }
        return this._token;
      }
}