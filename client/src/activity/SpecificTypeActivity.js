import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import API from '../api/api.js';
import '../style/NewActivities.css';

export default class SpecificTypeActivity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activity: '',
            type: '',
            open: false
        }
        this.getSpecific = this.getSpecific.bind(this);
    } 

    getSpecific = async (type) => {
        // console.log(this.type)
        await fetch( API.boredAPI.type + type)
        .then( response =>  response.json())
        .then( data  => 
            this.setState({
                activity: data.activity,
                type: data.type
            })
        ) 
     }

    addActivity = async () => {
        if (this.state.activity ) {
            await fetch(API.activities.add + API.userId, {
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
        this.setState({ activity: e.target.value })
    }

    handleType = (e) => {
        this.setState({ type: e.target.value })
    }

    render () {

        const { activity } = this.state;

        return (
            <div id="specific">

                <div>
                    <div className="type-container">
                        <Button
                        variant="link"
                        value={ this.state.type } 
                        onClick={ () => this.getSpecific('education') }>
                        Education </Button>
                        
                        <Button
                        variant="link"
                        value={ this.state.type } 
                        onClick={ () => this.getSpecific('recreational') }>
                        Recreational</Button>

                        <Button
                        variant="link"
                        value={ this.state.type } 
                        onClick={ () => this.getSpecific('social') }>
                        Social</Button>

                        <Button
                        variant="link"
                        value={ this.state.type } 
                        onClick={ () => this.getSpecific('diy') }>
                        DIY</Button>

                        <Button
                        variant="link"
                        value={ this.state.type } 
                        onClick={ () => this.getSpecific('charity') }>
                        Charity</Button>

                        <Button
                        variant="link"
                        value={ this.state.type } 
                        onClick={ () => this.getSpecific('cooking') }>
                        Cooking</Button>

                        <Button
                        variant="link"
                        value={ this.state.type } 
                        onClick={ () => this.getSpecific('relaxation') }>
                        Relaxation</Button>

                        <Button
                        variant="link"
                        value={ this.state.type } 
                        onClick={ () => this.getSpecific('music') }>
                        Music</Button>
                        
                        <Button
                        variant="link"
                        value={ this.state.type } 
                        onClick={ () => this.getSpecific('busywork') }>
                        Busywork</Button>

                    </div>

                    <div id="output">
                        <input 
                        className="form-control"
                        disabled
                        type="text"
                        onChange={ this.handleActivity.bind(this) } 
                        value={ this.state.activity } 
                        placeholder={ activity } 
                        />

                        <Button 
                        className="boot-btn add" 
                        variant="success" 
                        onClick={ () => this.addActivity() }>
                            Add
                        </Button>
                    </div>

                </div>

            </div>
        );
    }
}