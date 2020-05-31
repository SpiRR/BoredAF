import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import '../style/Settings.css';

export default class Settings extends Component {

    render () {

        return (
            
            <div id="settings-container">
                <h3>Settings</h3>
                <Button href="/changepw">Change password</Button>
            </div>
            
        );
    }
}