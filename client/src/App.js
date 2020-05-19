import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Signup from './pages/Signup.js';
import Login from './pages/Login.js';
import Homepage from './pages/HomePage.js'
import Activities from './pages/Activity/Activities.js'
import Profile from './pages/ProfilePage.js'
import CreateActivity from './pages/Activity/CreateActivity.js'

function App() {
  return (
    <Router>
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign up</Link>
        <Link to="/activity">Let's do somthing</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/activity" component={Activities} />
        <Route path="/profile" component={Profile} />
        <Route path="/createactivity" component={CreateActivity} />

      </Switch>

      </div>
    </Router>
  );
}

export default App;
