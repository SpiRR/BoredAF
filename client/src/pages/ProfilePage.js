import React, { Component } from 'react';
import '../style/Profile.css';
import Add from '../images/add.svg';
import Settings from '../images/settings.svg';
import MyActivities from '../activity/MyActivities.js';

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
      // if (this.props.user)  {
        // console.log(this.props.user)
        // const user = this.props.user;
        const user_id = 9
        fetch ( `http://localhost:9090/users/profile/${user_id}`, {
          credentials: "include",
        })
          .then( response => response.json() )
          .then( data => this.setState({ email: data.email, nickname: data.nickname }))    
      // }
    
    }


    render () {
      // const { user } = this.state;

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