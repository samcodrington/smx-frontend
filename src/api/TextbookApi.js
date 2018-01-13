// TextbookApi.js

import request from './BaseApi';



function searchTextbook(searchField) {
    return request({
      method: 'GET',
      url: '/textbooks/search',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'searchField': searchField
      }
    });
  }

  function postTextbook(textbook) {
      return request({
        method: 'POST',
        url: '/textbooks/post',
        data: {textbook},
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      });
    }


  const UserApi = { searchTextbook, postTextbook };

  export default UserApi;
