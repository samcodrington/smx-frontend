
// UserProfile.js

// React
import React, { Component } from 'react';

// Components
import UserInfo from '../../components/Userinfo.js';
import Textbook from '../../components/Textbook.js';

//API
import TextbookAPI from '../../api/TextbookApi.js';

class UserProfile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let userInfo = {
      nameFirst: this.props.user.nameFirst,
      nameLast: this.props.user.nameLast,
      email: this.props.user.email,
      school: this.props.user.school
    }
    //Cycle through data to generate textbooks
    var postedTextbooks = this.props.user.postedtextbooks;
    postedTextbooks = postedTextbooks.map(id => {
      //TODO: get textbook info from textbookID
      return <p> {id} </p>
      //  <Textbook />
      
    });
    
    return (
      <div className='UserInfo'>
        <UserInfo user = {userInfo}/>
      </div>
    );
  }
}

export default UserProfile;
