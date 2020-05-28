import React,{ Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import './style/Navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';
import Homepage from './pages/HomePage.js'
import Profile from './pages/ProfilePage.js';
import NewActivity from './activity/NewActivity.js';
import MyActivities from './activity/MyActivities.js';
import Settings from './pages/Settings.js';
import ChangePW from './pages/ChangePassword.js';
import Logout from './component/Logout.js';

export default class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      user_id : ''
    }
  }
 

  
 render() {
    return (
      <Router>
      <div>
        <nav>
          <Link to="/profile">Profile</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign-up</Link>
          <Link to="/">Home</Link>
          <Link to="/logout">Logout</Link>
        </nav>

        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/profile" component={Profile} />
          <Route path="/newactivity" component={NewActivity} />
          <Route path="/myactivities" component={MyActivities} />
          <Route path="/settings" component={Settings} />
          <Route path="/changepw" component={ChangePW}/>
          <Route path="/logout" component={Logout}/>
        </Switch>

        </div>
      </Router>
    );
  }
}

