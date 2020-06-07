import React,{ Component } from 'react';
import Signup from "./Signup.js";
import Hi from "../images/hi.gif";
import '../style/Homepage.css';

export default class Homepage extends Component {  
    render () {
        return (
            <div id="homepage-container">
                <h3>Tired of being bored?</h3>

                <h5>I'm here to tell you that there's nothing wrong with being bored! </h5>

                <h5>but... if you REALLY want something to do - then let's get you going!</h5>


                <Signup />

                <p><i>Bored of being bored because being bored is boring!</i></p>
                
                <img src={Hi} alt="hi"/>
               
            </div>
        );
    }
}