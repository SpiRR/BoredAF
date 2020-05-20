import React,{ Component } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import 'react-dropdown/style.css';
import '../style/Signup.css';

export default class Signup extends Component {

    render () {
        const regions = [1, 2];
        const defaultOption = [0];

        return (
            <div id="signup-container">
                <h3>Signup</h3>
                <form>
                    <input class="form-control"
                        placeholder="E-mail"
                        type="text"
                        />
                    <input class="form-control"
                        placeholder="Nickname"
                        type="text"
                        />
                    <input class="form-control"
                        placeholder="password"
                        type="password"
                        />
                    <input class="form-control"
                        placeholder="Repeat password"
                        type="password"
                        />

                    <Dropdown>
                    <Dropdown.Toggle variant="outline-primary primary" id="dropdown-basic">
                        Regions
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>

                    <Button variant="success">Signup</Button>
                </form>
            </div>
        );
    }
}