import React, { Component, createElement } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Random from '../images/random.svg';
import '../style/NewActivities.css'

export default class NewActivity extends Component {
    constructor(props) {
        super(props);
        
    }

    // Get random activity
    getRandom = async () => {
        await fetch("http://www.boredapi.com/api/activity/")
        .then( response =>  response.json())
        .then(
            (data) => {
                this.setState({
                    activity: data.activity,
                    // type: data.type
                })
            }
         ) 
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
            <div id="activities-container">
                <h3>All right! What do you want to do?</h3>
                <form id="own">
                    <h5>Add you own acitivity?</h5>
                    <textarea  className="form-control"
                        placeholder="What's the activity?"
                        type="text"
                        />

                    {/* Dropdown (select) with type of activity here */}

                    <Button variant="success">Add to my activities!</Button>
                </form>

                <div id="specific">
                <h5>Any specific type of activity?</h5>

                    {/* Dropdown (select) with type of activity here */}

                    <div>Load the given activity here</div>

                    <Button className="boot-btn add" variant="success">Add</Button>
                    <Button className="boot-btn new" variant="danger">New</Button>
                </div>

                <div id="random">
                <h5>Surprice me!</h5>
                    <Button variant="light" onClick={() => this.getRandom()}><img src={Random} alt="Random" /></Button>

                    <form>
                        {/* {activity} */}
                        {/* {type} */}
                        <Button className="boot-btn add" variant="success">Add</Button>
                    </form>

                    {/* <Button className="boot-btn new" variant="danger">New</Button> */}

                </div>
            </div>
        );
    }
}