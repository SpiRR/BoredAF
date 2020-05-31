import React,{ Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import "./App.css";
import "./style/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./pages/Signup.js";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import Profile from "./pages/ProfilePage.js";
import NewActivity from "./activity/NewActivity.js";
import MyActivities from "./activity/MyActivities.js";
import Settings from "./pages/Settings.js";
import ChangePW from "./pages/ChangePassword.js";
import Logout from "./component/Logout.js";

export default class App extends Component { 
  
 render() {

    return (

      <Router>
        <div>
          <nav>
            <Link to="/profile" >Profile</Link>
            <Link to= "/login" >Login</Link>
            <Link to="/signup" >Signup</Link>
            <Link to="/" >Home</Link> 
            <Link to="/logout" >Logout</Link>
          </nav>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route path="/login" >
              <Login />  {/* setUserId={this.setUserId} */}
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>

            <Route path="/profile">
              <Profile 
                // user={this.state.user}
              />
            </Route>
            
            <Route path="/newactivity">
              <NewActivity />
            </Route>

            <Route path="/myactivities">
              <MyActivities />
            </Route>

            <Route path="/settings">
              <Settings />
            </Route>

            <Route path="/changepw">
              <ChangePW />
            </Route>

            <Route path="/logout">
              <Logout />
            </Route>

          </Switch>

        </div>
    </Router>
    );
  }
}

