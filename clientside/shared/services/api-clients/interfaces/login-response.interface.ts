import {UserModel} from "../../../models/user.model";

export interface LoginResponseInterface{
    user: UserModel,
    tokens:{
        access: Token,
        refresh: Token
    }
}

export interface Token{
    token: string,
    expires: string
}