/* This code snippit was taken from the 
"Moments" walkthrough project. */

import axios from "axios";

// axios.defaults.baseURL = 'https://8000-greenninjab-forgefocusa-fla8hc5ilxv.ws.codeinstitute-ide.net';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// This line of code intercepts the request
export const axiosReq = axios.create();

// This line of code intercepts the response
export const axiosRes = axios.create();

// Retrieve the token from local storage
const token = localStorage.getItem('token');

// If the token exists, set it in the Authorization header
if (token) {
    axiosReq.defaults.headers.common['Authorization'] = `Token ${token}`;
    axiosRes.defaults.headers.common['Authorization'] = `Token ${token}`;
}