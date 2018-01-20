import React, { Component } from 'react';

class UserInfo extends Component{
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            nameFirst : props.user.nameFirst,
            nameLast : props.user.nameLast,
            email : props.user.email,
            school : props.user.school
        };
    }

    render(){
        return (
            <div className ='UserInfo'>
                <p>Name: {this.state.nameFirst + " " +this.state.nameLast} </p>
                <p>Email: {this.state.email} </p>
                <p>School: {this.state.school} </p>
            </div>
        );
    }
};  

export default UserInfo;