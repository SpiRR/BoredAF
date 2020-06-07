import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Random from '../images/random.svg';
import Swal from 'sweetalert2';
import API from '../api/api.js';
import axios from "axios";
import '../style/NewActivities.css';

export default class RandomActivity extends Component {

    constructor( props ) {
        super( props );

        this.state = {
            activity: '',
            type: ''
        }

        this.getRandom = this.getRandom.bind( this );
        this.handleChange = this.handleChange.bind( this );
    }
    
    componentDidMount() {
        axios.get( API.users.session, { withCredentials: true } )
        .then(res => {
            const sess = res.data   
            this.setState({ userEmail: sess.email, userNickname: sess.nickname, userId: sess.userId });
        })
    } 

    getRandom = async () => {
        await fetch( API.boredAPI.randomActivity )
        .then( response =>  response.json() )
        .then( data  => 
                this.setState({
                    activity: data.activity,
                    type: data.type
                })
            ); 
    }

    addActivity = async () => {
        if ( this.state.activity ) {
            await fetch( API.activities.add + this.state.userId, {
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
            .then( response => console.log( response.json() ) )
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

    handleChange = (e) => {
        this.setState({ 
            [ e.target.name ] : e.target.value
        });
    }

    render () {

        const { activity } = this.state;

        return (
            <div id="random">
                
                <Button id="randomBtn" variant="light" onClick={ () => this.getRandom() }><img src={ Random } alt="Random" /></Button> <br />
                
                <form>
                    <input 
                        disabled 
                        onChange={ this.handleChange.bind( this ) } 
                        value={ this.state.activity } 
                        placeholder={ activity } 
                    />

                    <p 
                        onChange={ this.handleChange.bind( this ) } 
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