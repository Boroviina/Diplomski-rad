import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const REGISTER_URL = `${API_URL}/auth/register`;

export function register(name: string, email: string, password: string, lastname:string
) {
    return axios.post(REGISTER_URL, {
        name,
        lastname,
        email,
        password,
    })
}