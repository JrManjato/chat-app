import Cookies from 'js-cookie';

// Set a cookie
export const setCookie = (key, value) => {
    Cookies.set(key, value);
};

// Get a cookie
export const getCookie = (key) => {
    return Cookies.get(key);
};

// Get a user's token
export const getAccessToken = (key) => {
   return  JSON.parse(Cookies.get(key)).token;
};

// Remove a cookie
export const removeCookie = (key) => {
    return Cookies.remove(key);
};