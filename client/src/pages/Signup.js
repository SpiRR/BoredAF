import React,{ Component } from 'react';
import Button from 'react-bootstrap/Button';
import '../style/Signup.css';

export default class Signup extends Component {

    render () {

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
                        placeholder="Password"
                        type="password"
                        />

                    <input class="form-control"
                        placeholder="Repeat password"
                        type="password"
                        />

                    <Button variant="success">Signup</Button>
                </form>
            </div>
        );
    }
}