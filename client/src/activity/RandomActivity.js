import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Random from '../images/random.svg';
import Swal from 'sweetalert2';
import API from '../api/api.js';
import '../style/NewActivities.css';

export default class RandomActivity extends Component {

    constructor( props ) {
        super( props )

        this.state = {
            activity: '',
        }

        this.getRandom = this.getRandom.bind( this )
    }

    getRandom = async () => {
        await fetch( API.boredAPI.randomActivity )
        .then( response =>  response.json() )
        .then( data  => 
                this.setState({
                    activity: data.activity,
                    type: data.type
                })); 
    }

    // Need to check if its empty
    addActivity = async () => {
        if ( this.state.activity ) {
            await fetch( API.activities.add + API.userId, {
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
            .then( data => this.setState( data ) )
            .then( Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'The activity has been added!',
                showConfirmButton: false,
                timer: 2000
              }) )  
        } else {
            console.log('Please click the randomizer')
        }
    }

    handleActivity = (e) => {
        this.setState({ activity: e.target.value });
    }
    
    handleType = (e) => {
        this.setState({ type: e.target.value });
    }

    render () {

        const { activity } = this.state;

        return (
            <div id="random">
                
                <Button id="randomBtn" variant="light" onClick={ () => this.getRandom() }><img src={Random} alt="Random" /></Button>

                <form>
                    <input 
                        disabled 
                        onChange={ this.handleActivity.bind( this ) } 
                        value={ this.state.activity } 
                        placeholder={ activity } 
                    />

                    <p 
                        onChange={ this.handleType.bind( this ) } 
                        value={ this.state.type }>
                        { this.state.type } 
                    </p>

                    <Button 
                        className="boot-btn add" 
                        variant="success" 
                        onClick={ () => this.addActivity() }>
                        Add
                    </Button>
                </form>

            </div>
        );
    }
}