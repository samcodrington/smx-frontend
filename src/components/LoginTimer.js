//loginTimer.js
import React, { Component } from 'react';
const resetTime = 60*5; //5 minutes in seconds
class LoginTimer extends Component{
    constructor(props){
        super(props);
        this.state = {
            secsLeft: null
        };
    };   
    tick(){
        const newSecs = this.state.secsLeft - 1;
        if (newSecs == 0) 
            this.setState({secsLeft: null});//TriggerLogout
        else
        this.setState({secsLeft: newSecs});
    }
    resetTimer(){
        this.setState({secsLeft: resetTime});
    }
    //TODO trigger logout from props

    componentDidMount(){
        //TODO This???
    }
    render() {
        if (this.state.secsLeft > 30) return null;
        else {
            return(
                <p>You've only got {this.state.secsLeft} seconds left before automatic logout</p>
            )
        }
    }
    
}
export default LoginTimer;
