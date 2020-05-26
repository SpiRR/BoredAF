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
          done: ''
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

      // Filtering activities done, all and pending
      showAll = async () => {
        console.log('all')
        let user_id = 1
        await fetch(`http://localhost:9090/activities/all/${user_id}`)
        .then(response => response.json())
        .then( data => this.setState({ activities: data }))
      }

      showPending = async () => {
        console.log('pending')
        let user_id = 1
        await fetch(`http://localhost:9090/activities/pending/${user_id}`)
        .then(response => response.json())
        .then( data => this.setState({ activities: data }))
      }
  
      showDone = async () => {
        console.log('completed')
        let user_id = 1
        await fetch(`http://localhost:9090/activities/done/${user_id}`)
        .then(response => response.json())
        .then( data => this.setState({ activities: data }))
      }

      completeActivity = async (id) => {
        console.log(id)
        await fetch(`http://localhost:9090/activities/completed/${id}`, {
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
        .then( data => console.log({ activities: data }) ) 
      }

      handleChange = (e) => {
        this.setState({ status: e.target.value })
      }
    
    render () {
        const { activities } = this.state;

        return (
            <div id="list-container">
                <div id="sort">
                    <select name="done" id="dropdown" >
                      <option value="all" onClick={ () => this.showAll() } onChange={this.handleChange.bind(this)}>All</option>
                      <option value="pending" onClick={ () => this.showPending() } onChange={this.handleChange.bind(this)}>Pending</option>
                      <option value="done" onClick={ () => this.showDone() } onChange={this.handleChange.bind(this)}>Completed</option>
                    </select>
                </div>

                {/* <p><i>You don't have any activities... yet! :) </i></p> */}
                <ul>
                    { activities.map(activity => 
                        <li id="activity" key={activity.id}>
                           <p>{activity.activity}</p> 
                           <p className="italic"><i>{activity.type}</i></p>

                            <button 
                            onClick={ () => this.completeActivity(activity.id) }> 
                                {activity.done === 0 ? <img src={Pending} alt="complete activity"/>
                                : 
                                <img src={Completed} alt="complete activity"/>}
                            </button>
                            <button key={activity.id} id="delete"><img type ="button" src={Delete} alt="delete activity" onClick={() => this.deleteActivity(activity.id)}/></button>
                        </li>
      
                    )}
                </ul>
            </div>
            
        );
    }
}