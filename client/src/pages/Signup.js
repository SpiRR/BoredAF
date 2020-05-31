import React,{ Component } from "react";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Swal from 'sweetalert2';
import API from '../api/api.js';
import "../style/Signup.css";

export default class Signup extends Component {

    constructor( props ) {
        super( props );

        this.state = {
            email: "",
            nickname: "",
            password: "",
            repeatPassword: "",
            redirect: null
        }

        this.handleChange = this.handleChange.bind( this )
        this.handleSubmit = this.handleSubmit.bind( this )
    }

  
    handleChange = (e) => {
        this.setState({ 
            [e.target.name] : e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log('form submitted')
        await fetch( API.users.register, {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                email: this.state.email,
                nickname: this.state.nickname,
                password: this.state.password,
                repeatPassword: this.state.repeatPassword
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then( response => response.json() )
        .then( data => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Registration complete',
                showConfirmButton: false,
                timer: 2000
            })
            this.setState({user: data, redirect: "/login"})
            
            })
        }
        
    
    render () {

        if (this.state.redirect) {
            return <Redirect to={ this.state.redirect } />
          }
          
        return (
            <div id="signup-container">
                <h3>Signup</h3>

                <form onSubmit={ this.handleSubmit }>
                    <input className="form-control"
                        placeholder="E-mail"
                        type="email"
                        name="email"
                        value={ this.state.email }
                        onChange={ this.handleChange }
                    />
                        
                    <input className="form-control"
                        placeholder="Nickname"
                        type="text"
                        name="nickname"
                        value={ this.state.nickname }
                        onChange={ this.handleChange }
                    />

                    <input className="form-control"
                        placeholder="Password"
                        type="password"
                        name="password"
                        value={ this.state.password }
                        onChange={ this.handleChange }
                    />

                    <input className="form-control"
                        placeholder="Repeat password"
                        type="password"
                        name="repeatPassword"
                        value={this.state.repeatPassword}
                        onChange={ this.handleChange }
                    />

                    <Button variant="success" type="submit">Signup</Button>

                </form>
            </div>
        );
    }
}