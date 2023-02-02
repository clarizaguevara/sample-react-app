import { purgeStoredState } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import Cookies from 'js-cookie'

const persistConfig = {
    key: 'appPersist',
    storage: storage,
    whitelist: ['token'] // which reducer want to store
};

export const terminateSession = () => {
    Cookies.remove('token');
    localStorage.removeItem('persist:appPersist')
}

export const storeToken = (accessToken) => {
    let expire = new Date(new Date().getTime() + 60 * 60 * 1000);
    // Cookies.set('token', accessToken, { expires: expire })
    Cookies.set('token', accessToken) // no expiration - temporary only
}

export const getToken = () => {
    return Cookies.get('token')
}

export const setSession = () => {
    var expire = new Date(new Date().getTime() + 50 * 60 * 1000);
    Cookies.set('session', 'session', { sameSite: 'strict', expires: expire })
}

export const getSession = () => {
    return Cookies.get('session')
}

export const setSessionId = () => {
    sessionStorage.setItem('sessionId', Date.now().toString())
}

export const getSessionId = () => {
    return sessionStorage.getItem('sessionId')
    
}

export const clearSessionId = () => {
    sessionStorage.removeItem('sessionId')
}