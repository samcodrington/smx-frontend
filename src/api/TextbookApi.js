// TextbookApi.js

import request from './BaseApi';


//returns an array of texbook objects matching the search terms
function searchTextbook(searchField) {
    return request({
      method: 'GET',
      url: '/textbooks/search',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'searchField': searchField
      },
      withCredentials: true
    });
  }

  //posts a textbook associated with the user
  function postTextbook(textbook) {
      return request({
        method: 'POST',
        url: '/textbooks/post',
        data: {textbook},
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        withCredentials: true
      });
    }
  function deleteUserTextbook(textbook){
    return request({
      method: 'DELETE',
      url: '/textbooks/delete/' + textbook,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      withCredentials: true
    })
  }

  //returns the textbook object which matches the textbook ID
  function getOneTextbook(textbookID){
    return request({
      method: 'GET',
      url: '/textbooks/get/' + textbookID,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
  }


  const TextbookApi = { searchTextbook, postTextbook, deleteUserTextbook, getOneTextbook };
  

  export default TextbookApi;
