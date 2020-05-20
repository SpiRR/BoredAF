import React,{ Component } from 'react';
import Button from 'react-bootstrap/Button';
import '../style/Login.css';

export default class Login extends Component {  
    render () {
        return (
            <div id="login-container">
                <h3>Login</h3>
                <form>
                    <input class="form-control"
                        placeholder="E-mail"
                        type="text"
                        />
                    <input class="form-control"
                        placeholder="Password"
                        type="password"
                        />
                   <Button variant="success">Signup</Button>
                </form>
                <a href="/signup">Not a member yet?</a>
            </div>
        );
    }
}