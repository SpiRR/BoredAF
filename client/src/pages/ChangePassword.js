import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import API from '../api/api.js';
import axios from "axios";
import '../style/Changepw.css';

export default class ChangePw extends Component {

    constructor( props ) {
        super( props );

        this.state = {
            newPassword: '',
            repeatNewPassword: '',
            redirect: null
        }

        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleChange = this.handleChange.bind( this );
      }

    componentDidMount() {
        axios.get( API.users.session, { withCredentials: true } )
        .then(res => {
            const sess = res.data;   
            this.setState({ userEmail: sess.email, userNickname: sess.nickname, userId: sess.userId });
        })
    }

    handleChange = (e) => {
        this.setState({ 
            [ e.target.name ] : e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await fetch( API.users.changePW + this.state.userId , {
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
        .then( data => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Password successfully changed',
                showConfirmButton: false,
                timer: 2000
            });
            this.setState({ user: data, redirect: "/profile" })
        })
    }

    render () {
        
        if ( this.state.redirect ) {
            return <Redirect to={ this.state.redirect } />
          }

        return (

            <div id="changepw-container">
                
                <h3>Change password</h3>

                <a href="/profile">Back to profile...</a>

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