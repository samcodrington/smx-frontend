import { Component } from 'react';
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

import AuthApi from '../../api/AuthApi';

const privelegedURLs = ["/textbook", "/search", "/post-textbook", "/settings", "/user", "/manage-textbooks"];

class Authenticator extends Component{
    static propTypes = {
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
      };
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: this.props.isLoggedIn,
            view: this.props.view,
            history: this.props.history,
            location: this.props.location
        };
        this.checkPriveleged(this.state.location.pathname);
    }

    componentWillReceiveProps(nextProps){
        //AuthActions
        if (nextProps.authAction !== null){
            this.props.resetAuthAction();
            if (nextProps.authAction == "logout") this.triggerLogout();
            else if (nextProps.authAction == "verify") this.checkLoginStatus();
        }
        
        if (nextProps.location !== this.props.location)
            this.checkPriveleged(nextProps.location.pathname);
        
        //other prop updates
        if (nextProps.isLoggedIn !== this.state.isLoggedIn)
            this.setState({isLoggedIn:nextProps.isLoggedIn});

        if (nextProps.view !== this.state.view)
            this.setState({view:nextProps.view});
    }
    
    checkPriveleged(url){
        if (url){
            for (let p of privelegedURLs){
                    if (url.startsWith(p) && this.state.isLoggedIn == false){
                    alert("Unable to Access Priveleged URL, please sign in!");
                    this.state.history.push('/');
                }
            }
        }
    }

    triggerLogout(){
        console.log("Logging Out");
        //alert("Logout Triggered");
        AuthApi.logout().then((response)=>{
            this.props.changeLoginStatus(false);
            //TODO clear cookie

        }).catch((response)=>{
            console.log(response);
            //TODO handle bad logout
            alert('Something went wrong: ' + response.status);
        });
        this.props.changeLoginStatus(false);
        this.state.history.push('/');
    }


    checkLoginStatus(){    
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

    render() {return null;}
  
} 
const AuthenticatorWithRouter = withRouter(Authenticator);
export default AuthenticatorWithRouter;

