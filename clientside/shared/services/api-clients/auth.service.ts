import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {LoginResponseInterface} from "./interfaces/login-response.interface";
import {LogOutInterface} from "./interfaces/log-out.interface";
import {UserModel} from "../../models/user.model";
import {getUser} from "../user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthModel} from "../../models/auth.model";
 // import {REACT_APP_API_URL} from '@env';

const API_URL = process.env.REACT_APP_API_URL;


//login user and retrieve JWT token

class AuthService {
    async login(email: string, password: string): Promise<LoginResponseInterface | null> {
        try {
            const response = await axios.post<LoginResponseInterface>(`${API_URL}/auth/login`, {email, password});
            console.log("This is response",response.data);
            this.saveToken(response.data.tokens.access.token);
            return response.data;
        } catch (error) {
            console.log("Login failed:", error);
            // console.log("Login failed:", error.response);
            return null;
        }

    }

    async logout(refreshToken: string): Promise<LogOutInterface | null> {
        try {
            const response = await axios.post<LogOutInterface>(`${API_URL}/auth/logout`, {refreshToken});
            this.removeToken();
            return response.data;
        } catch (error) {
            console.error("Logout failed:", error);
            return null;
        }
    }

    //save Token in AsyncStorage
    saveToken(token: string): void {
        AsyncStorage.setItem('token', token).then(()=> {
            console.log("Token saved succesfully");
            console.log("Saved Token: ", token);
        })
            .catch(error=>console.error("Error saving token", error));
    }

    //retrieve token
    getToken(): Promise<string | null> {
        return AsyncStorage.getItem('token');
    }

//delete token
    removeToken(): void {
        AsyncStorage.removeItem('token');
    }

    //decode the JWT token and retrieve the user information
    async getUser(): Promise<UserModel | null> {
        const token = await this.getToken();
        console.log("Retrieved token: ", token )
        if (token) {
            const decoded: any = jwtDecode(token);
            console.log("Decoded token:", decoded);
            const user = await getUser(decoded.sub);
            console.log("Retrieved user: ", user);
            return user;
        }
        return null;
    }
}

export default AuthService;

