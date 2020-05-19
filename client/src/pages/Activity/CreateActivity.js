import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default class CreateActivity extends Component {
    render () {

        const activitytype = [1, 2];
        const defaultOption = [0];

        return (
            <div>
                <h3>All right! What do you want to do?</h3>
                <form>
                    <input 
                        placeholder="What's the activity?"
                        type="text"
                        />
                    <Dropdown
                        className='dropdown'
                        menuClassName='myMenuClassName'
                        options={activitytype} 
                        // onChange={on._select}
                        value={defaultOption}
                        placeholder='What type is this activity?'
                    />

                    <button>Add to my activities!</button>
                </form>
            </div>
        );
    }
}