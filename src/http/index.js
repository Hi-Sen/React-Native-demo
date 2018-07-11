import React, { Component } from 'react';
import axios from 'axios'

let token = '';

var instance = axios.create({
    baseURL: '请联系作者',
    timeout: 5000,
    headers: {
        'X-Custom-Header': 'foobar',
        'Authorization': ''
    },
});

//添加请求拦截器
instance.interceptors.request.use(
    config => {
        if (instance.Authorization != '') {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = '';
        }
        return config;
    },
    err => {
        return Promise.reject(err);
});

export default instance;
