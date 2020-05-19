import React,{ Component } from 'react';
import '../style/Login.css';

export default class Login extends Component {  
    render () {
        return (
            <div id="login-container">
                <h3>Login</h3>
                <form>
                    <input 
                        placeholder="E-mail"
                        type="text"
                        />
                    <input 
                        placeholder="password"
                        type="password"
                        />
                    <button>Login</button>
                </form>
            </div>
        );
    }
}