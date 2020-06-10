import React, { Component } from 'react';
import Delete from '../images/delete.svg';
import Completed from '../images/completed.svg';
import Pending from '../images/pending.svg';
import API from '../api/api.js';
import axios from 'axios';
import '../style/MyActivities.css';

export default class MyActivities extends Component {
    
    constructor( props ) {
        super( props );
        
        this.state = {
          activities: [],
          activity: '',
          done: false,
        };

        this.deleteActivity = this.deleteActivity.bind( this );
        this.completeActivity = this.completeActivity.bind( this );
      }

      getAllMyActivities = () => {
        axios.get( API.activities.all + this.state.userId, { withCredentials: true } )
        .then( res => this.setState({ activities: res.data }) )
      }

      componentDidMount() {
        axios.get( API.users.session, { withCredentials: true } )
        .then(res => {
          const sess = res.data;   
          this.setState({ userId: sess.userId });
          this.getAllMyActivities();
        })
      } 
                         
      deleteActivity = async (id) => {
          await fetch( API.activities.deleteativity + id , {
              method: "DELETE",
              credentials: "include",
          })
          .then( response => response.json() )
          .then( data => {
            let activities = this.state.activities.filter(( activity ) => {
              return id !== activity.id;
            });
            this.setState( state => {
              state.activities = activities;
              return state;
            });
          });          
      }
      
      showAll = async () => {
        console.log('all')
        await fetch( API.activities.all + this.state.userId )
        .then( response => response.json() )
        .then( data => this.setState({ activities: data }));
      }

      showPending = async () => {
        console.log('pending')
        await fetch( API.activities.pending + this.state.userId)
        .then( response => response.json() )
        .then( data => this.setState({ activities: data }));
      }
  
      showDone = async () => {
        console.log('completed')
        await fetch( API.activities.done + this.state.userId)
        .then( response => response.json() )
        .then( data => this.setState({ activities: data }));
      }

      //ticks all
      completeActivity = async (activity) => {
        await fetch( API.activities.completed + activity.id, {
          method: "PATCH",
          credentials: "include",
          body: JSON.stringify({
            done: this.state.done
          }),
          headers: {
            'Content-Type': 'application/json'
        },
        })
        .then( response => response.json() )
        .then( data => {
          if ( data.response === 1 ) {
            let tmpActivities = this.state.activities;
            let index = tmpActivities.indexOf(activity);
            activity.done = 1;
            activity[index] = activity;
            this.setState({ activities : tmpActivities })
          } else {
            console.error('Error')
          }
        });
      } 

      handleChange = (e) => {
        this.setState({ value: e.target.value })
      }

    render () {
        const { activities } = this.state;

        return (
            <div id="list-container">

                <div id="sort">

                    <select name="done" id="dropdown" >
                      <option value="all" onClick={ () => this.showAll() } onChange={ this.handleChange.bind(this) }>All</option>
                      <option value="pending" onClick={ () => this.showPending() } onChange={ this.handleChange.bind(this) }>Pending</option>
                      <option value="done" onClick={ () => this.showDone() } onChange={ this.handleChange.bind(this) }>Completed</option>
                    </select>

                </div>
             
                <ul>
                    { activities.map( activity => 

                        <li id="activity" key={ activity.id }>

                           <p>{ activity.activity }</p> 
                           
                           <p className="italic"> <i>{ activity.type }</i> </p>

                            <button 
                              value={activity.done}
                              onClick={ () => this.completeActivity(activity) }> 
                              <img src={ activity.done === 1 ?  Completed : Pending } alt="..."/>
                            </button>

                            <button 
                              id="delete" 
                              key={activity.id} 
                              onClick={ () => this.deleteActivity(activity.id) }>
                              <img type ="button"src={ Delete } alt="delete activity" />
                            </button>

                        </li>
                    )}

                </ul>

            </div>
            
        );
    }
}