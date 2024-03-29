import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import API from '../api/api.js';
import axios from "axios";
import '../style/NewActivities.css';

export default class EnteredActivity extends Component {

    componentDidMount() {
        axios.get( API.users.session, { withCredentials: true } )
        .then(res => {
          const sess = res.data   
          this.setState({ userEmail: sess.email, userNickname: sess.nickname, userId: sess.userId });
        });
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
            .then( response => response.json() )
            // .then( data => console.log( data ) )
            .then( Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'The activity has been added!',
                showConfirmButton: false,
                timer: 2000
              }));
        } else {
            console.log('Enter in input');
        }
    }

    handleActivity = (e) => {
        this.setState({ activity: e.target.value });
    }
    
    handleType = (e) => {
        this.setState({ type: e.target.value });
    }

    render () {
        return (
            <div id="own">

                <form>

                    <textarea 
                        id="mainInput"
                        className="form-control"
                        placeholder="What's the activity?"
                        type="text"
                        onChange={this.handleActivity.bind(this)}
                        value={this.activity}
                    />

                   <select required onChange={this.handleType.bind(this)}>
                       <option>Types: </option>
                       <option value={this.type}>education</option>
                       <option value={this.type}>recreational</option>
                       <option value={this.type}>social</option>
                       <option value={this.type}>diy</option>
                       <option value={this.type}>charity</option>
                       <option value={this.type}>cooking</option>
                       <option value={this.type}>relaxation</option>
                       <option value={this.type}>music</option>
                       <option value={this.type}>busywork</option>
                   </select>

                    <Button type="reset" variant="success" onClick={ () => this.addActivity() }>Add to my activities!</Button>
                
                </form>
                
            </div>
        );
    }
}