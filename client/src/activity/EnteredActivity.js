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
     addActivity = async () => {
        if (this.state.activity) {
            let user_id = 1
            await fetch(`http://localhost:9090/activities/add/${user_id}`, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    activity: this.state.activity,
                    type: this.state.type
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then( response => console.log(response.json()) )
            .then( data => console.log( data ) )
            // .then( this.deleteText() ) 
        } else {
            console.log('Enter in input')
        }
    }

    handleActivity = (e) => {
        this.setState({ activity: e.target.value })
    }
    
    handleType = (e) => {
        this.setState({ type: e.target.value })
    }

    deleteInput = () => {
        this.setState({ activity: '', type: '' })
    }


    render () {
        return (
            <div  id="own">
                <form>
                    <h5>Add you own acitivity?</h5>
                    <input className="form-control"
                        placeholder="What's the activity?"
                        type="text"
                        onChange={this.handleActivity.bind(this)}
                        value={this.activity}
                        />

                   <select required onChange={this.handleType.bind(this)}>
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
            </div>
        );
    }
}