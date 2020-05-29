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

    }
  }
  
  // Fetching user-info
  componentDidMount() {
    const userData = sessionStorage.getItem("user")
    const user = JSON.parse(userData)
    this.setState({ user_id: user.sess.user_id, email: user.email })
    // set state of id
      fetch ( `http://localhost:9090/users/profile/${user.sess.user_id}` )
        .then( response => response.json() )
        .then( data => console.log({ data: data }))
    }


    render () {
      const { user } = this.state;

        return (
            <div id="profile-container">
              <h3>Profile page</h3>
              <p>{this.state.email}</p>

              <h5>Hi {/* this.state.nickname */} !
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