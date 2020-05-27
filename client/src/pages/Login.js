import React,{ Component } from 'react';
import { Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../style/Login.css';

export default class Login extends Component {  
    constructor(props) {
        super(props);

        this.state = {
            user: [],
            email: "",
            nickname: "",
            password: "",
            repeatPassword: "",
            redirect: null,
            data: {}
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

  
    handleChange = (e) => {
        this.setState({ 
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log('I want to login!')
        await fetch("http://localhost:9090/users/login", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then( response => response.json() )
        .then( data => {
            this.setState({ user: data, redirect: `/profile`})
            // const myData = {user: data}
            sessionStorage.setItem("myData", JSON.stringify(data))
            
        } )
    }

    render () {

        if (this.state.redirect) {
            return <Redirect to={ this.state.redirect } />
          }

        return (
            <div id="login-container">
                <h3>Login</h3>
                <form onSubmit={ this.handleSubmit }>
                <input class="form-control"
                        placeholder="Email"
                        type="text"
                        name="email"
                        value={ this.state.email }
                        onChange={ this.handleChange }
                        />

                    <input class="form-control"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={ this.state.password }
                        onChange={ this.handleChange }
                        />

                   <Button variant="success" type="submit">Login</Button>
                   
                </form>
                <a href="/signup">Not a member yet?</a>
            </div>
        );
    }
}