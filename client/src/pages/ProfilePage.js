import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import '../style/Profile.css';
import Add from '../images/add.svg';
import Settings from '../images/settings.svg';
import MyActivities from '../activity/MyActivities.js';

export default class Profile extends Component {
    render () {
        const nickName = "Merinaraa";
        return (
            <div id="profile-container">
              <h3>Profile page</h3>

              <h5>Hi {nickName}
              <a href="/settings"><img src={Settings} alt="Profile settings"/></a>
              <a href="/newactivity"><img src={Add} alt="Add activity"/></a>
              </h5>

            <div id="sort">

              <select name="done" id="dropdown">
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="done">Completed</option>
              </select>
            </div>

              <div id="activity-container">
                <MyActivities />
              </div>

            </div>
        );
    }
}