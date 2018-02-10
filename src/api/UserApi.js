
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

  function createUserInfo(user) {
      return request({
        method: 'POST',
        url: '/users/createInfo',
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

//returns an array of textbook objects that the user has posted (owns)
function getUserPostedTextbook(userID){
  return request({
    method: 'GET',
    url: '/users/posted/' + userID,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });
}

//returns an array of textbook objects that the user has saved
function getUserSavedTextbook(userID){
  return request({
    method: 'GET',
    url: '/users/saved/' + userID,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });
}

const UserApi = { getUserById, createUser, settings, getUserPostedTextbook, getUserSavedTextbook };

export default UserApi;
