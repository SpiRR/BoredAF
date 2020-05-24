import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import '../style/NewActivities.css'

export default class SpecificTypeActivity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activity: '',
            type: ''
        }
    } 

        // getSpecific = async () => {
    //     await fetch(`http://www.boredapi.com/api/activity?type=${types}`)
    //     .then( response =>  response.json())
    //     .then(
    //         ( data ) => {
    //             this.setState({
    //                 activity: data.activity,
    //                 type: data.type
    //             })
    //         }
    //      ) 
    // }

    render () {
        return (
            <div id="specific">
            <h5>Any specific type of activity?</h5>

                {/* Dropdown (select) with type of activity here */}

                <div>Load the given activity here</div>

                <Button className="boot-btn add" variant="success">Add</Button>
                <Button className="boot-btn new" variant="danger">New</Button>
            </div>
        );
    }
}