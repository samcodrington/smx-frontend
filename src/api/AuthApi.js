// UserApi.js

import request from './BaseApi';

function  login(user, pass) {
    return request({
      method: 'POST',
      url: '/auth/login',
      body: {username: user, password: pass},
      headers: {
        //'Access-Control-Allow-Origin': '*',
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }); //storing cookies here?
  }

function logout(){
    return request({
        method: 'POST',
        url: '/auth/logout'
        //cookie :
    })
}


const UserApi = { login, logout };

export default UserApi;