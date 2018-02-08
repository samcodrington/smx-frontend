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
  function deleteUserTextbook(textbook){
    return request({
      method: 'DELETE',
      url: '/textbooks/delete/' + textbook,
      data: {textbook},
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true
    })
  }


  const TextbookApi = { searchTextbook, postTextbook, deleteUserTextbook };

  export default TextbookApi;
