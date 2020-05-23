import React, { Component } from 'react';
import Completed from '../images/completed.svg';
import Delete from '../images/delete.svg';
import Pending from '../images/pending.svg';
import '../style/MyActivities.css';

export default class MyActivities extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
          activities: [],
          activity: '',
          status: []
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

      
    // Sorting on all, pending, done onClick
      // Testing needed
    showAll = async () => {
        console.log('all')
        let user_id = 1
        await fetch(`http://localhost:9090/activities/all/${user_id}`)
        .then(response => response.json())
        .then( data => this.setState({ status: data }))
      }
      
      showPending = async () => {
        console.log('pending')
        let user_id = 1
        await fetch(`http://localhost:9090/activities/all/pending/${user_id}`)
        .then(response => response.json())
        .then( data => this.setState({ status: data }))
      }
  
      showDone = async () => {
        console.log('completed')
        let user_id = 1
        await fetch(`http://localhost:9090/activities/all/done/${user_id}`)
        .then(response => response.json())
        .then( data => this.setState({ status: data }))
      }
    
    render () {
        const { activities, status } = this.state;

        return (
            <div id="list-container">
                <div id="sort">
                    <select name="done" id="dropdown">
                    <option value="all" onClick={ () => this.showAll() }>All</option>
                    <option value="pending" onClick={ () => this.showPending() }>Pending</option>
                    <option value="done" onClick={ () => this.showDone() }>Completed</option>
                    </select>
                </div>

                {/* <p><i>You don't have any activities... yet! :) </i></p> */}
                <ul>
                    { activities.map(activity => 
                        <li id="activity" key={activity.id}>
                           <p>{activity.activity} </p> <b>{activity.done === 0 ? <img src={Pending} alt="complete activity"/>: <img src={Completed} alt="complete activity"/>}</b>
                            {/* <button id="completed"><img src={Completed} alt="complete activity"  /></button> */}
                            <button key={activity.id} id="delete"><img type ="button" src={Delete} alt="delete activity" onClick={() => this.deleteActivity(activity.id)}/></button>
                        </li>
      
                    ) }
                </ul>
            </div>
            
        );
    }
}