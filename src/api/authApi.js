// UserApi.js

import request from './BaseApi';

function  login(user, pass) {
    return request({
      method: 'POST',
      url: '/auth/login',
      body: {username: user, password: pass}
    });
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