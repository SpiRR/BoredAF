import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import API from '../api/api.js';
import '../style/Changepw.css';

export default class ChangePw extends Component {

    constructor( props ) {
        super( props );

        this.state = {
            newPassword: '',
            repeatNewPassword: ''
        }

        this.handleSubmit = this.handleSubmit.bind( this )
        this.handleChange = this.handleChange.bind( this )
      }

    handleChange = e => {
        this.setState({ 
            [ e.target.name ] : e.target.value
        })
    }

    handleSubmit = async e => {
        e.preventDefault();

        await fetch( API.users.changePW + API.userId , {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify({
                newPassword: this.state.newPassword,
                repeatNewPassword: this.state.repeatNewPassword
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then( response => response.json() )
        .then( data => console.log( data ))
    }

    render () {

        return (

            <div id="changepw-container">
                
                <h3>Change password</h3>

                <form onSubmit={ this.handleSubmit }>

                    <input className="form-control"
                        placeholder="New Password"
                        type="password"
                        name="newPassword"
                        value={ this.state.newPassword }
                        onChange={ this.handleChange }
                    />

                    <input className="form-control"
                        placeholder="Repeat new password"
                        type="password"
                        name="repeatNewPassword"
                        value={ this.state.repeatNewPassword }
                        onChange={ this.handleChange }
                    />

                    <Button type="submit">Change password</Button>

                </form>
            </div>
            
        );
    }
}