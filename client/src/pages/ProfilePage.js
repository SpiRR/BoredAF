import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Add from '../images/add.svg';
import Settings from '../images/settings.svg';
import MyActivities from '../activity/MyActivities.js';
import API from '../api/api.js';
import axios from 'axios';
import '../style/Profile.css';

export default class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userNickname: '',
      userEmail: '',
      userId: '',
    }
  }

  // check if user is logged in
  componentDidMount() {
    axios.get( API.users.session, { withCredentials: true } )
    .then(res => {
      const sess = res.data;  
      this.setState({ userEmail: sess.email, userNickname: sess.nickname, userId: sess.userId });
    });
  } 
  
  // Fetching user-info
  componentDidUpdate ( prevState ) {   
     if (prevState.userId !== this.state.userId) {
      axios.get( API.users.profile + this.state.userId, { withCredentials: true })
        .then( res => {
            console.log(res.data);
        });  
      } 
    }

    render () {

      if (this.state.redirect) {
        return <Redirect to={ this.state.redirect } />
      }

        return (
            <div id="profile-container">

              <a id="logout" href="/logout">Logout</a>
              
              <h3>Profile page</h3>

              <p>{ this.state.userEmail }</p>

              <h5>Hi { this.state.userNickname } !

              <a href="/settings"><img src={ Settings } alt="Profile settings"/></a>
              <a href="/newactivity"><img src={ Add } alt="Add activity"/></a>
              
              </h5>


              <div id="activity-container">
                <MyActivities />
              </div>

            </div>
        );
    }
}