
// UserApi.js

import request from './BaseApi'

function get(id) {
  return request({
    url: id,
    method: 'GET'
  });
}

const UserApi = { get };

export default UserApi;