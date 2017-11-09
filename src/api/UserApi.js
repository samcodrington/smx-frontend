
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
      body: user,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

function signIn(user) {
    return request({
      method: 'POST',
      url: '/users/sign_in',
      body: user
    });
}

const UserApi = { getUserById, createUser };

export default UserApi;
