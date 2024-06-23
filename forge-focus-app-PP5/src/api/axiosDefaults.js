/* This code snippit was taken from the 
"Moments" walkthrough project. */

import axios from "axios";

axios.defaults.baseURL = 'https://forge-focus-bad8bb2ca164.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

// This line of code intercepts the request
export const axiosReq = axios.create();

// This line of code intercepts the response
export const axiosRes = axios.create();

axiosReq.interceptors.request.use(function (config) {
    // Assuming you store your token in localStorage; adjust as needed
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  });