import React, { Component } from 'react';
import RandomActivity from './RandomActivity.js';
import EnteredActivity from './EnteredActivity.js';
import SpecificTypeActivity from './SpecificTypeActivity.js';
import Collapsible from 'react-collapsible';
import '../style/NewActivities.css';

export default class NewActivity extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            activity: '',
            type: ''
        }
    }
    
    render () {
        
        return (
            <div id="activities-container">
                <h3>All right! What do you want to do?</h3>
                
                <Collapsible trigger="Enter your own activity">
                    <EnteredActivity />
                </Collapsible>
                
                <Collapsible trigger="Get a random activity">
                    <RandomActivity 
                        activity={this.props.activity}
                        type={this.props.type}
                    />
                </Collapsible>

                <Collapsible trigger="Get a random of a specific type">
                    <SpecificTypeActivity 
                        activity={this.props.activity}
                        type={this.props.type}
                    />
                </Collapsible>

        
            </div>
        );
    }
}