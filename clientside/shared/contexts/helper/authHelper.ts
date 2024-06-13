import {AuthModel} from "../../models/auth.model";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_ASYNC_STORAGE_KEY = 'tb-auth-key';

const getAuth = async (): Promise<AuthModel | undefined >=> {
    if (!AsyncStorage) {
        return
    }
    const lsValue: string | null = await AsyncStorage.getItem(AUTH_ASYNC_STORAGE_KEY);
    if (!lsValue) {
        return
    }
    try {
        const auth: AuthModel = JSON.parse(lsValue) as AuthModel
        if (auth) {
            return auth
        }
    } catch (error) {
        console.error('Auth parse error', error)
    }
}

const setAuth = (auth: AuthModel) => {
    if (!AsyncStorage) {
        return;
    }
    try {
        const IsValue = JSON.stringify(auth)
        AsyncStorage.setItem(AUTH_ASYNC_STORAGE_KEY, IsValue).then();
    } catch (error) {
        console.error("Auth save error", error);
    }
}

const removeAuth = () => {
    if (!AsyncStorage) {
        return
    }
    try {
        AsyncStorage.removeItem(AUTH_ASYNC_STORAGE_KEY).then();
    } catch (error) {
        console.error("Auth remove error", error);
    }
}

export {getAuth, setAuth, removeAuth, AUTH_ASYNC_STORAGE_KEY}