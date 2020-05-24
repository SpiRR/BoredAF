import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import '../style/NewActivities.css'

export default class EnteredActivity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activity: '',
            type: ''
        }
    }

        // Activity and type is undefined
    // addActivity = async (e) => {
    //     let user_id = 1
    //     await fetch(`http://www.boredapi.com/api/add/${user_id}`, {
    //         method: "POST",
    //         credentials: "include",
    //         body: JSON.stringify({
    //             activity: activity,
    //             type: type
    //         })
    //         .then( response => response.json() )
    //         .then( data => this.setState({ activity: data.activity, type: data.type}) ) 
    //     })
    // }

    render () {
        return (
            <form id="own">
                    <h5>Add you own acitivity?</h5>
                    <input  className="form-control"
                        placeholder="What's the activity?"
                        type="text"
                        value={this.activity}
                        onChange={this.addActivity}
                        />

                   <select required>
                       <option value={this.type}>Education</option>
                       <option value={this.type}>Recreational</option>
                       <option value={this.type}>Social</option>
                       <option value={this.type}>DIY</option>
                       <option value={this.type}>Charity</option>
                       <option value={this.type}>Cooking</option>
                       <option value={this.type}>Relaxation</option>
                       <option value={this.type}>Music</option>
                       <option value={this.type}>Busywork</option>
                   </select>

                    <Button variant="success" onClick={ () => this.addActivity() }>Add to my activities!</Button>
                </form>
        );
    }
}