import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import '../style/Profile.css';
import Add from '../images/add.svg';
import Settings from '../images/settings.svg';
import Sort from '../images/sort.svg'
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
              <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <img src={Sort} alt="Sort"/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Pending</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Done</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
            </div>

              <div id="activity-container">
                <MyActivities />
              </div>

            </div>
        );
    }
}