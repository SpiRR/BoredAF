import React, { Component } from 'react';
import '../style/Profile.css';
import Add from '../images/add.svg';
import Settings from '../images/settings.svg';
import MyActivities from '../activity/MyActivities.js';
import { BrowserRouter } from 'react-router-dom';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      email: '',
    }
  }
  
  // Fetching user-info
  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData = () => {
    fetch ( `http://localhost:9090/users/profile/${this.props.user}` )
      .then( response => response.json() )
      .then( data => console.log({ nickname: data.nickname, email: data.email }))
  }

    render () {
      const { user } = this.props;

        return (
            <div id="profile-container">
              <h3>Profile page</h3>
              <p>{this.props.email}</p>

              <h5>Hi {this.props.nickname} !
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