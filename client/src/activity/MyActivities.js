import React, { Component } from 'react';
import Delete from '../images/delete.svg';
import Completed from '../images/completed.svg';
import Pending from '../images/pending.svg';
import '../style/MyActivities.css';

export default class MyActivities extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
          activities: [],
          activity: '',
          emptyData: [],
          done: false,
        };

        this.deleteActivity = this.deleteActivity.bind(this);
        this.completeActivity = this.completeActivity.bind(this);
      }

      componentDidMount() {
        const user_id = 9
        fetch ( `http://localhost:9090/activities/all/${user_id}` )
          .then( response => response.json() )
          .then( (data) => {
            // console.log(data)
            if ( data.length === 0 ) {
              return this.setState({ emptyData: 'You dont have any activities... yet! :) ' })
            } else {
              this.setState({ activities: data })
            }
          })
      }
                          // needs to be activityid?
      deleteActivity = async (id) => {
        // You need to reload page for seeing which items are removed (that you have clicked on)
          await fetch(`http://localhost:9090/activities/deleteactivity/${id}`, {
              method: "DELETE",
              credentials: "include",
          })
          .then( response => response.json() )
          .then( (data) => {
            let activities = this.state.activities.filter((activity) => {
              return id !== activity.id;
            });
            this.setState( state => {
              state.activities = activities;
              return state;
            })
          })          
      }

      showAll = async () => {
        console.log('all')
        const user_id = 9
        await fetch(`http://localhost:9090/activities/all/${user_id}`)
        .then(response => response.json())
        .then( (data) => {
          // console.log(data)
          if ( data.length === 0 ) {
            return this.setState({ emptyData: 'You dont have any activities... yet! :) ' })
          } else {
            this.setState({ activities: data })
          }
        })
      }

      showPending = async () => {
        console.log('pending')
        const user_id = 9
        await fetch(`http://localhost:9090/activities/pending/${user_id}`)
        .then(response => response.json())
        .then( data => this.setState({ activities: data }))
      }
  
      showDone = async () => {
        console.log('completed')
        const user_id = 9
        await fetch(`http://localhost:9090/activities/done/${user_id}`)
        .then(response => response.json())
        .then( data => this.setState({ activities: data }))
      }

      //ticks all
      completeActivity = async (activity) => {
        await fetch(`http://localhost:9090/activities/completed/${activity.id}`, {
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
            // const found = tmpActivities.find(element => element.id == activity.id);
            let index = tmpActivities.indexOf(activity);
            activity.done = 1;
            activity[index] = activity;
            this.setState({activities : tmpActivities })
          } else {
            console.error('Error')
          }
        })
      } 

      // console.log({ done: data })

      handleChange = (e) => {
        this.setState({ value: e.target.value })
      }

    render () {
        const { activities, emptyData } = this.state;

        return (
            <div id="list-container">
                <div id="sort">
                    <select name="done" id="dropdown" >
                      <option value="all" onClick={ () => this.showAll() } onChange={ this.handleChange.bind(this) }>All</option>
                      <option value="pending" onClick={ () => this.showPending() } onChange={ this.handleChange.bind(this) }>Pending</option>
                      <option value="done" onClick={ () => this.showDone() } onChange={ this.handleChange.bind(this) }>Completed</option>
                    </select>
                </div>

                <p><i>{emptyData}</i></p>
             
                <ul>
                    {activities.map(activity => 
                        <li id="activity" key={activity.id}>
                           <p>{activity.activity}</p> 
                           
                           <p className="italic"> <i>{activity.type}</i> </p>

                            <button 
                            value={activity.done}
                            onClick={ () => this.completeActivity(activity) }> 
                              <img src={ activity.done === 1 ?  Completed : Pending } alt="..."/>
                            </button>

                            <button 
                            id="delete" 
                            key={activity.id} 
                            onClick={ () => this.deleteActivity(activity.id) }>
                              <img type ="button"src={Delete} alt="delete activity" />
                            </button>
                        </li>
      
                    )}
                </ul>
            </div>
            
        );
    }
}