
export class User {
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public role?: string,
        public google?: boolean,
        public _id?: string,
    ) {}
}
