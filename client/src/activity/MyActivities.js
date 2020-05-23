import React, { Component } from 'react';
import Completed from '../images/completed.svg';
import Delete from '../images/delete.svg';
import '../style/MyActivities.css';

export default class MyActivities extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
          activities: [],
          activity: ''
        };
        this.deleteActivity = this.deleteActivity.bind(this);
      }

      componentDidMount() {
        let user_id = 1; // static for now (testing)
        fetch ( `http://localhost:9090/activities/all/${user_id}` )
          .then( response => response.json() )
          .then( data => this.setState({ activities: data }))

      }

      deleteActivity = async (id) => {
        // You need to reload page for seeing which items are removed (that you have clicked on)
          await fetch(`http://localhost:9090/activities/deleteactivity/${id}`, {
              method: "DELETE",
              credentials: "include"
          })
          .then( response => response.json() )
          .then( data => this.setState({activity: data.id}) )
      }
    
    render () {
        const { activities } = this.state;

        return (
            <div id="list-container">
                {/* <p><i>You don't have any activities... yet! :) </i></p> */}
                <ul>
                    { activities.map(activity => 
                        <li id="activity" key={activity.id}>
                            <p>{activity.activity} </p> <b>{activity.done === 0 ? 'pending' : 'completed'}</b>
                            <button key={activity.id} id="delete"><img type ="button" src={Delete} alt="delete activity" onClick={() => this.deleteActivity(activity.id)}/></button>
                            <button id="completed"><img src={Completed} alt="complete activity"  /></button>
                        </li>
      
                    ) }
                </ul>
            </div>
            
        );
    }
}