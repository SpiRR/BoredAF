import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import '../style/NewActivities.css'

export default class NewActivity extends Component {
    render () {

        // Own, specific activity, random

        return (
            <div id="activities-container">
                <h3>All right! What do you want to do?</h3>
                <form id="own">
                    <input  class="form-control"
                        placeholder="What's the activity?"
                        type="text"
                        />

                    <Dropdown>
                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                        Type of activity
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Types of activities listed here</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Loaded from DB</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>

                    <Button>Add to my activities!</Button>
                </form>

                <div id="specific">
                <Dropdown>
                    <Dropdown.Toggle variant="info" id="dropdown-basic">
                        Type of activity
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Types of activities listed here</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Loaded from DB</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>

                    <div id="given-activity"> Load the given activity here</div>

                    <Button>Add</Button>
                    <Button>New</Button>
                </div>

                <div id="random">
                    <Button>Random</Button>

                    <div>Random activity here</div>

                    <Button>Add</Button>
                    <Button>New</Button>

                </div>
            </div>
        );
    }
}