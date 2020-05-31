import React, { Component } from 'react';
import Add from '../images/add.svg';
import Settings from '../images/settings.svg';
import MyActivities from '../activity/MyActivities.js';
import API from '../api/api.js';
import '../style/Profile.css';

export default class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      nickname: ''
    }
  }

  // Fetching user-info
  componentDidMount () {   
        fetch ( API.users.profile + API.userId, {
          credentials: "include",
        })
          .then( response => response.json() )
          .then( data => this.setState({ 
            email: data.email, 
            nickname: data.nickname 
          }));    
    }


    render () {

        return (
            <div id="profile-container">
              <h3>Profile page</h3>

              <p>{this.state.email}</p>

              <h5>Hi {this.state.nickname} !

              <a href="/settings"><img src={Settings} alt="Profile settings"/></a>
              <a href="/newactivity"><img src={Add} alt="Add activity"/></a>
              
              </h5>


              <div id="activity-container">
                <MyActivities />
              </div>

            </div>
        );
    }
}