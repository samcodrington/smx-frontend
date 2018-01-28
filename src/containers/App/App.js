
// App.js

// React
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Material UI Components
import { withTheme } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

// APIs
import AuthApi from '../../api/AuthApi';

// Containers
import About from '../About/About';
import NotFound from '../NotFound/NotFound';
import UserProfile from '../UserProfile/UserProfile';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import Search from '../Search/Search';
import PostTextbook from '../PostTextbook/PostTextbook';
import ViewTextbook from '../ViewTextbook/ViewTextbook'

// Components
import Navbar from '../../components/Navbar';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        isLoggedIn: false,
        user: null,
        view: "home"
    };
  }

  //callbacks for authentiation
  checkLoginStatus = () => {
    AuthApi.verify()
    .then((response) => {
      if (this.state.isLoggedIn == false)
        this.changeLoginStatus(true);
    })
    .catch((error) => {
      if (this.state.isLoggedIn == true)
        this.changeLoginStatus(false);
    });
  }

  changeLoginStatus = (login) =>{
    this.setState({isLoggedIn: login});
    if (!login)
      this.setState({user:null});
  }

  addUserInfo = (u) => {
    console.debug('User: ', u);
    this.setState({
      user: {
        _id: u._id,
        username: u.username,
        nameFirst: u.nameFirst,
        nameLast: u.nameLast,
        email: u.email,
        school: u.school,
        postedtextbooks: u.postedtextbooks,
        savedtextbooks: u.savedtextbooks
      }
    })
  }

  triggerLogout = () => {
    //alert("Logout Triggered");
    AuthApi.logout().then((response)=>{
      this.setState({loggingOut: true});
      this.changeLoginStatus(false);
      //TODO clear cookie

    }).catch((response)=>{
      console.log(response);
      //TODO handle bad logout
      alert('Something went wrong: ' + response.status);
    });
  }
  componentDidMount(){
    if (this.state.isLoggedIn)
      AuthApi.verify();
  }


  render() {
    const { theme } = this.props;

    const classes = {
      root: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        backgroundColor: theme.palette.background.default
      },
      appFrame: {
        position: 'absolute',
        display: 'flex',
        width: '100%',
        height: '100%',
      },
      navBar: {
        zIndex: 2,
        position: 'fixed'
      },
      content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        position: 'relative',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
          height: 'calc(100% - 64px)',
          marginTop: 64,
        },
        overflow: 'scroll' //remove internal scrollbar
      }
    }
    return (
      <div>
        <Grid item xs={12}>
          <Navbar style={ classes.navBar } 
            isLoggedIn = {this.state.isLoggedIn}
            triggerLogout = {this.triggerLogout}
            view = {this.state.view}
          />
        </Grid>
        <div style={ classes.root }>
          <Grid container spacing={8}>
            <div style={ classes.appFrame }>
              <Grid item xs={12} style={ classes.content }>
                <Switch>
                  <Route exact path="/" component={SignUp} />
                  <Route exact path="/sign-in"
                    render = {
                      props => {
                        if (this.state.isLoggedIn == false){
                          return <SignIn
                            changeLoginStatus = {this.changeLoginStatus}
                            addUserInfo = {this.addUserInfo}
                          />} 
                        else
                          return <Redirect to = "/user"/>
                        }
                    }
                  />
                  <Route exact path='/user' render = {
                    () => {
                      if (this.state.isLoggedIn)
                        return <UserProfile user = {this.state.user} />
                      else {
                        alert ('Cannot Access Priveleged URL, Please Sign In');
                        return <Redirect to = "/sign-in"/>
                      }
                    }
                  }/>

                  <Route exact path='/about' component={About} />
                  <Route exact path='/textbook' component={ViewTextbook} />
                  <Route exact path='/search/:query' component={Search} />
                  <Route exact path='/post-textbook'
                    render = {
                      props => {
                        return <PostTextbook
                          user = {this.state.user}
                        />
                      }
                    }
                  />
                  <Route exact path="*" component={NotFound} />
                </Switch>
              </Grid>
            </div>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withTheme()(App);
