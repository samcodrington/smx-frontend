
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
      url: '/create_user',
      body: user
    });
  }

const UserApi = { getUserById, createUser };

export default UserApi;