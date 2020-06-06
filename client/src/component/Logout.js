import React,{ Component } from 'react';
import API from '../api/api.js';
import axios from 'axios';
import ByeBye from "../images/byebye.gif";
import "../style/Logout.css";

export default class Logout extends Component {

componentDidMount () {
    axios.get( API.users.logout, { withCredentials: true } )
    .then( res => {
        const user = res;
        console.log(user)
    })
}

    render () {
        return (
            <div id="logout-container">
                <h4>You have been logged out, successfully!</h4>
                <a href="/">Return to home</a>
                <img src={ByeBye} alt="bye bye" />
            </div>
        );
    }
}