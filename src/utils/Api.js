import axios from 'axios';
import Cookies from 'js-cookie'
import axiosRetry from 'axios-retry';
// import { getPaymentId } from './Auth'
// import { login as loginService } from '../store/Auth/AuthServices'

let instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.request.use(config => {
    const token = Cookies.get('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    config.headers['Cache-Control'] = 'no-cache'
    return config;
});

instance.interceptors.response.use(null, (error) => {
    // if (401 === error.response.status) {
    //     loginService(getPaymentId());
    // }
    return Promise.reject(error);
});

axiosRetry(instance, {
    retries: 3,
    retryDelay: (retryCount) => {
        return retryCount * 2000;
    },
    retryCondition: (error) => {
        const codes = [200, 422]
        return !codes.includes(error.response.status);
    },
})

export default instance;

