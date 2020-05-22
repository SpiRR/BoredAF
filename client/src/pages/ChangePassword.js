import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import '../style/Changepw.css';

export default class ChangePw extends Component {
    render () {
        return (
            <div id="changepw-container">
                <h3>Change password</h3>

                <form>
                <input className="form-control"
                type="password"
                placeholder="New Password"
                />

                <input className="form-control"
                type="password"
                placeholder="Repeat new password"
                />

                <Button href="/changepw">Change password</Button>
                </form>

            </div>
            
        );
    }
}