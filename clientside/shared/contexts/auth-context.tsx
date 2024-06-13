import AuthService from "../services/api-clients/auth.service";
import {AuthModel} from "../models/auth.model";
import {UserModel} from '../models/user.model'
import {createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useRef, useState} from "react";
import * as authHelper from './helper/authHelper';
import * as SplashScreen from 'expo-splash-screen'

type AuthContextProps = {
    auth: AuthModel | undefined
    saveAuth: (auth: AuthModel | undefined) => void
    currentUser: UserModel | undefined
    setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
    logout: () => void
}

const initAuthContextPropsState = {
    auth: undefined,
    saveAuth: () => {
    },
    currentUser: undefined,
    setCurrentUser: () => {
    },
    logout: () => {
    }
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);
const authService = new AuthService();

const useAuth = () => {
    return useContext(AuthContext);
}
type AuthProviderProps = {
    children: ReactNode
}

const AuthProvider: FC<AuthProviderProps> = ({children}) => {
    const [auth, setAuth] = useState<AuthModel | undefined>();
    const [currentUser, setCurrentUser] = useState<UserModel | undefined>();

    useEffect(() => {
        const fetchAuth = async () => {
            const authData = await authHelper.getAuth();
            setAuth(authData);
        }
        fetchAuth().then();
    }, [])
    const saveAuth = (auth: AuthModel | undefined) => {
        setAuth(auth);
        if (auth) {
            authHelper.setAuth(auth);
        } else {
            authHelper.removeAuth();
        }
    }

    const logout = async () => {
        saveAuth(undefined);
        setCurrentUser(undefined);
        if (auth && auth.refresh) {
            await authService.logout(auth.refresh.token);
        }
    }
    return (
        <AuthContext.Provider value={{auth, saveAuth, currentUser, setCurrentUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
// //provjera statusa authentifikacije prije nego sto se omoguci pristup unutrasnjim komponentama aplikacije
const AuthInit: FC<AuthProviderProps> = ({children}) => {
    const {auth, logout, setCurrentUser} = useAuth();
    const didRequest = useRef(false);

    SplashScreen.preventAutoHideAsync().then();

    useEffect(() => {
        const requestUser = async (access: string) => {
            try {
                if (!didRequest.current) {
                    const user = await authService.getUser();
                    if (user) {
                        console.log(user);
                        setCurrentUser(user);
                    }
                }
            } catch (error) {
                console.error(error);
                if (!didRequest.current) {
                    logout();
                }
            } finally {
                await SplashScreen.hideAsync();
            }

            return () => (didRequest.current = true);
        }
        if (auth && auth.access) {
            requestUser(auth.access.token).then();
        } else {
            logout();
            SplashScreen.hideAsync().then();
        }
    }, [])
    return <>{children}</>
}

export {AuthProvider, useAuth, AuthInit}