import Api from './api-clients/api-client';
import {UserModel, UsersResponse} from "../models/user.model";

const USER_ENDPOINT = 'user';
//function for getting data from backend

export const getUsers = (): Promise<UserModel[] | null> => {

    return Api.get(USER_ENDPOINT)
        .then(response => response.data)
        .then(data => data.results.map((user: any) => new UserModel(user)))
};


export const getUser = (userId: string): Promise<UserModel | null> => {
    return Api.get(`${USER_ENDPOINT}/${userId}`)
        .then(response => response.data)
        .then(data => new UserModel(data));
}

export const updateUser = (userId: string, user: Partial<UserModel>): Promise<UserModel | null> => {
    return Api.patch(`${USER_ENDPOINT}/${userId}`, user)
        .then(response => response.data)
        .then(data => new UserModel(data));
}

export const createUser = (user: UserModel): Promise<UserModel | null> => {
    return Api.post(`${USER_ENDPOINT}`, user)
        .then(response => response.data)
        .then(data => new UserModel(data));
}

export const deleteUser = (userId: string): Promise<any> => {
    return Api.remove(`${USER_ENDPOINT}/${userId}`)
        .then(response => response.data);
}

