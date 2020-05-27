import React, { Component } from 'react';
import '../style/Profile.css';
import Add from '../images/add.svg';
import Settings from '../images/settings.svg';
import MyActivities from '../activity/MyActivities.js';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nickname: '',
      email: ''
    }
  }

  // Fetching user-info
  componentDidMount() {
    fetch ( `http://localhost:9090/users/profile/${this.props.user_id}` )
      .then( response => response.json() )
      .then( data => this.setState({ nickname: data.nickname, email: data.email }))
  }

    render () {
      const { nickname, email } = this.state;

        return (
            <div id="profile-container">
              <h3>Profile page</h3>
              <p>{email}</p>

              <h5>Hi {nickname} !
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