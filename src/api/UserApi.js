
// UserApi.js

import request from './BaseApi';

function  getUserById(id) {
    return request({
      method: 'GET',
      url: id
    });
  }

function createUser(user) {
    return request({
      method: 'POST',
      url: '/users/create',
      data: user,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

function signIn(user) {
    return request({
      method: 'POST',
      url: '/users/sign_in',
      data: user,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
}

const UserApi = { getUserById, createUser };

export default UserApi;
