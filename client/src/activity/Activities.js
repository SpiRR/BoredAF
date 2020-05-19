import React, { Component } from 'react';

export default class Activities extends Component {
    render () {
        return (
            <div>
                <h3>Lets do somthing!</h3>
                <h4>Do you want to do you own or should we find an activity for you?</h4>

{/* API with activity : Should it be generated
 in the frontend and then saved in backend?  */}
                <a href="/createactivity">I want my own</a>
                <a href="/">Get a random activity</a>                {/* Not done */}
                <a href="/">Get me a specific type of activity</a>   {/* Not done */}
          
            </div>
            
        );
    }
}