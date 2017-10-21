
// test-api.js

import axios from 'axios';

class TestApi {

  getDog() {
    axios.get('https://randomuser.me/api/')
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getText() {
    const foo = 'hello';
    return foo;
  }
}

export default TestApi;

