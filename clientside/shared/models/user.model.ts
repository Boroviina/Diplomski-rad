import {BaseModel} from "./base.model";

export class UserModel extends BaseModel {
    id?: string;
    role?: string;
    name?: string;
    lastname?: string;
    email?: string;
    password?: string;

    constructor(attributes?: any) {
        super();
        this.setAttributes(attributes);
    }
}

export class UsersResponse extends BaseModel {
    results?: UserModel[];
    page?: number;
    limit?: number;
    totalPages?: number;
    totalResults?: number;

    constructor(attributes?: any) {
        super();
        this.setAttributes(attributes);
        this.results = attributes?.results.map((user: any) => new UserModel(user))
    }
}