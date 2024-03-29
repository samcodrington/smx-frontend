// AuthApi.js

import request from './BaseApi';

function login(user, pass) {
  //Prepare data to be sent via www-form-urlencoded rather than JSON
  var params = new URLSearchParams();
  params.append('username', user);
  params.append('password', pass);
  
  return request({
    method: 'POST',
    url: '/auth/login',
    headers: {
      'Content-Type':'application/x-www-form-urlencoded' //'Access-Control-Allow-Origin': '*'
    },
    data: params,
    responseType: 'json',
    withCredentials: true
  });
}

function verify(){
  return request({
    method: 'GET',
    url: '/auth/',
    headers: {
      'Content-Type':'application/x-www-form-urlencoded' //'Access-Control-Allow-Origin': '*'
    },
    responseType: 'json',
    withCredentials: true
  });
}
function logout(){
    return request({
        method: 'POST',
        url: '/auth/logout',
        withCredentials: true     
    });
}


const AuthApi = { login, verify, logout };

export default AuthApi;