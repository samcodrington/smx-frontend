
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
        'Access-Control-Allow-Origin': '*'
      }
    });
  }

function signIn(user) {
    return request({
      method: 'POST',
      url: '/users/sign_in',
      data: user,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
}

function settings(user,useCase) {
    return request({
      method: 'POST',
      url: '/users/settings',
      data: {
        user,
        useCase
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
}

const UserApi = { getUserById, createUser, settings };

export default UserApi;
