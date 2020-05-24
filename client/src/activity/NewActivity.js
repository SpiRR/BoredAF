import React, { Component } from 'react';
import RandomActivity from './RandomActivity.js';
import EnteredActivity from './EnteredActivity.js';
import SpecificTypeActivity from './SpecificTypeActivity.js';
import '../style/NewActivities.css'

export default class NewActivity extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            activity: '',
            type: ''
        }
        // this.addActivity = this.addActivity.bind(this);
    }

    // Get random activity





    
    render () {
        
        return (
            <div id="activities-container">
                <h3>All right! What do you want to do?</h3>
                
                <EnteredActivity />

                <SpecificTypeActivity />

                <RandomActivity 
                    activity={this.props.activity}
                    type={this.props.type}
                />
        
            </div>
        );
    }
}