import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Random from '../images/random.svg';
import '../style/NewActivities.css'

export default class RandomActivity extends Component {
    constructor(props) {
        super(props)

        this.state = {
            activity: '',
            type: ''
        }
        this.getRandom = this.getRandom.bind(this)
    }

    getRandom = async () => {
        await fetch("http://www.boredapi.com/api/activity/")
        .then( response =>  response.json())
        .then( data  => 
                this.setState({
                    activity: data.activity,
                    type: data.type
                })
            ) 
    }

    // Activity and type is undefined
    addActivity = async () => {
        let user_id = 1
        await fetch(`http://www.boredapi.com/api/add/${user_id}`, {
            headers: {
                'Content-Type': 'application/json'
              },
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
                activity: this.state.activity,
                type: this.state.type
            })
        })
        .then( response => console.log(response.json()) )
        .then( data => console.log( data ) )
        // .then( this.deleteText() ) 
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

        const { activity, type } = this.state;

        return (
            <div id="random">
            <h5>Surprice me!</h5>
                <Button variant="light" onClick={ () => this.getRandom() }><img src={Random} alt="Random" /></Button>

                <form>
                    <input onChange={this.handleActivity.bind(this)} value={this.state.activity} placeholder={activity} />
                    <input onChange={this.handleType.bind(this)} className="form-control" value={this.state.type} placeholder={type} />
                    <Button className="boot-btn add" variant="success" onClick={ () => this.addActivity()}>Add</Button>
                </form>

            </div>
        );
    }
}