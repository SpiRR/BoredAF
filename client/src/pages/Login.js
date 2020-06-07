import React,{ Component } from 'react';
import { Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import API from '../api/api.js';
import '../style/Login.css';

export default class Login extends Component {  
    
    constructor( props ) {
        super( props );

        this.state = {
            email: '',
            password: '',
            redirect: null
        }
        
        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleChange = this.handleEmail.bind( this );
        this.handleChange = this.handlePassword.bind( this );
      }
    
    handleEmail = (e) => {
        this.setState({ 
            email: e.target.value, 
        });
    }
    
    handlePassword = (e) => {
        this.setState({ 
            password: e.target.value 
        });
    }
    
    
    handleSubmit = async (e) => {
        e.preventDefault();

        const userCredentials = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post( API.users.login, { email: userCredentials.email, password: userCredentials.password  }, { withCredentials: true }  ) // not reciving email and pw
            .then(res => {
                console.log( res );
                console.log( res.data );
                this.setState({ redirect: "/profile" })
        });
    }
    
    
    render () {

        if ( this.state.redirect ) {
            return <Redirect to={ this.state.redirect } />
          }

        return (
            <div id="login-container">
                <h3>Login</h3>

                <form onSubmit={ this.handleSubmit }>

                    <input className="form-control"
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={ this.state.email }
                        onChange={ this.handleEmail }
                    />

                    <input className="form-control"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={ this.state.password }
                        onChange={ this.handlePassword }
                    />

                   <Button variant="success" type="submit">Login</Button>
                   
                </form>

                <a href="/">Not a member yet?</a>
                
            </div>
        );
    }
}