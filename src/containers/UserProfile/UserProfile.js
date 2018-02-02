
// UserProfile.js

// React
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

// Material UI
import Button from 'material-ui/Button';

// Components
import UserInfo from '../../components/Userinfo.js';
import Textbook from '../../components/Textbook.js';

//API
import TextbookAPI from '../../api/TextbookApi.js';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    }

    this.handleSettings = this.handleSettings.bind(this);
  }

  componentDidMount() {

  }

  handleSettings(){
      this.props.handleSettings();
  }

  render() {
    let userInfo = {
      nameFirst: this.state.user.nameFirst,
      nameLast: this.state.user.nameLast,
      email: this.state.user.email,
      school: this.state.user.school
    }
    //Cycle through data to generate textbooks
    var postedTextbooks = this.props.user.postedtextbooks;
    postedTextbooks = postedTextbooks.map(id => {
      //TODO: get textbook info from textbookID
      return <p> {id} </p>
      //  <Textbook />
      
    });
    
    return (
      <div>
        <div className='UserInfo'>
          <h1> User Profile </h1>
          <UserInfo user = {userInfo}/>
          <Button type = 'submit'><Link to="/settings" style={{ textDecoration: 'none', color: 'black' }}>Settings</Link></Button>
        </div>
        <div className='PostedTextbooks'>
          <h1> Posted Textbooks </h1>
            {postedTextbooks}
        </div>
      </div>
    );
  }
}

export default UserProfile;
