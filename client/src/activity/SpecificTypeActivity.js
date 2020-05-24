import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
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
        await fetch(`http://www.boredapi.com/api/activity?type=${type}`)
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

        const { type, activity } = this.state;

        return (
            <div id="specific">

            <Button 
                onClick={ () => this.setState({open: true})}
                aria-controls="Specific type"
                aria-expanded={this.state.open}
            >
                Specific type
            </Button>
            
            <Collapse in={this.state.open}>
                <div>

                    <div className="type-container">
                        <Button
                        value={ this.state.type } 
                        onClick={ () => this.getSpecific('education') }>
                        Education </Button>
                        
                        <Button
                        value={ this.state.type } 
                        onClick={ () => this.getSpecific('recreational') }>
                        Recreational</Button>

                        <Button
                        value={ this.state.type } 
                        onClick={ () => this.getSpecific('social') }>
                        Social</Button>

                        <Button
                        value={ this.state.type } 
                        onClick={ () => this.getSpecific('diy') }>
                        DIY</Button>

                        <Button
                        value={ this.state.type } 
                        onClick={ () => this.getSpecific('charity') }>
                        Charity</Button>

                        <Button
                        value={ this.state.type } 
                        onClick={ () => this.getSpecific('cooking') }>
                        Cooking</Button>

                        <Button
                        value={ this.state.type } 
                        onClick={ () => this.getSpecific('relaxation') }>
                        Relaxation</Button>

                        <Button
                        value={ this.state.type } 
                        onClick={ () => this.getSpecific('music') }>
                        Music</Button>
                        
                        <Button
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
            </Collapse >

            </div>
        );
    }
}