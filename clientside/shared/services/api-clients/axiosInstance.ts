import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {REACT_APP_API_URL, PORT} from '@env';

const API_URL=process.env.REACT_APP_API_URL;

const axiosInstace=axios.create({
    baseURL: `${API_URL}`
})

axiosInstace.interceptors.request.use(
    (config)=>{
        config.headers.Authorization=`Bearer ${getToken()}`

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

function getToken(){
    return AsyncStorage.getItem('token');
}

export default axiosInstace;