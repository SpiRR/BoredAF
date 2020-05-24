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
                        onClick={ () => this.getSpecific() }>
                            Education
                        </Button>

                        <input className="form-control"
                        disabled
                        type="text"
                        onChange={ this.handleActivity.bind(this) } 
                        value={ this.state.activity } 
                        placeholder={ activity } 
                        />
                    </div>

                    {/* <a href="#">Recreational</a>
                    <a href="#">Social</a>
                    <a href="#">DIY</a>
                    <a href="#">Charity</a>
                    <a href="#">Cooking</a>
                    <a href="#">Relaxation</a>
                    <a href="#">Music</a>
                    <a href="#">Busywork</a> */}
                </div>
            </Collapse >

            </div>
        );
    }
}