import React,{ Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../style/Signup.css';

export default class Signup extends Component {

    render () {
        const regions = [1, 2];
        const defaultOption = [0];

        return (
            <div id="signup-container">
                <h3>Signup</h3>
                <form>
                    <input 
                        placeholder="E-mail"
                        type="text"
                        />
                    <input 
                        placeholder="Nickname"
                        type="text"
                        />
                    <input 
                        placeholder="password"
                        type="password"
                        />
                    <input 
                        placeholder="Repeat password"
                        type="password"
                        />

                    <Dropdown
                        className='dropdown'
                        menuClassName='myMenuClassName'
                        options={regions} 
                        // onChange={on._select}
                        value={defaultOption}
                        placeholder='Select you region'
                    />

                    <button>Signup</button>
                </form>
            </div>
        );
    }
}