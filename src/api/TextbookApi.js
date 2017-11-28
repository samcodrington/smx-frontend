// TextbookApi.js

import request from './BaseApi';



function searchTextbook(searchField) {
    return request({
      method: 'GET',
      url: '/textbooks/search',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'searchField': searchField
      }
    });
  }

  const UserApi = { searchTextbook };

  export default UserApi;
