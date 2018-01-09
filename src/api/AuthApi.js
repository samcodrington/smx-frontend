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
  });
}

function logout(){
    return request({
        method: 'POST',
        url: '/auth/logout'
    });
}


const UserApi = { login, logout };

export default UserApi;