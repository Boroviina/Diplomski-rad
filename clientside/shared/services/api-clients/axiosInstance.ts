import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL=process.env.REACT_APP_API_URL;

const axiosInstace=axios.create({
    baseURL: `${API_URL}`
})

axiosInstace.interceptors.request.use(
    async (config)=>{
        const token=await getAccessToken();
        if (token){
            config.headers.Authorization=`Bearer ${token}`
        }
        return config
    },
    function (error){
        return Promise.reject(error);
    }

)

axiosInstace.interceptors.response.use(
    function (response){
        return response;
    },
    function (error){
        if (error.response.status===401){
            window.location.href='/sign-in';
        }
        return Promise.reject(error);
    }
);

async function getAccessToken(){
    try {
        const authData=await AsyncStorage.getItem('tb-auth-key');
        if (authData){
            const auth=JSON.parse(authData);
            return auth?.access?.token;
        }
        return null;
    }catch (error){
        console.error('Failed to get token from AsyncStorage', error);
        return null;
    }
}

// function getToken(){
//     return AsyncStorage.getItem('token');
// }

export default axiosInstace;