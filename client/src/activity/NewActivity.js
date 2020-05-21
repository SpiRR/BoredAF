import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Random from '../images/random.svg';
import '../style/NewActivities.css'

export default class NewActivity extends Component {
    render () {

        // Own, specific activity, random

        return (
            <div id="activities-container">
                <h3>All right! What do you want to do?</h3>
                <form id="own">
                    <h5>Add you own acitivity?</h5>
                    <textarea  class="form-control"
                        placeholder="What's the activity?"
                        type="text"
                        />

                    <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        Type of activity
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Types of activities listed here</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Loaded from DB</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>

                    <Button variant="success">Add to my activities!</Button>
                </form>

                <div id="specific">
                <h5>Any specific type of activity?</h5>
                <Dropdown>
                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                        Type of activity
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Types of activities listed here</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Loaded from DB</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>

                    <div>Load the given activity here</div>

                    <Button className="boot-btn add" variant="success">Add</Button>
                    <Button className="boot-btn new" variant="danger">New</Button>
                </div>

                <div id="random">
                <h5>Surprice me!</h5>
                    <Button variant="light"><img src={Random} alt="Random" /></Button>

                    <div>Random activity here</div>

                    <Button className="boot-btn add" variant="success">Add</Button>
                    <Button className="boot-btn new" variant="danger">New</Button>

                </div>
            </div>
        );
    }
}