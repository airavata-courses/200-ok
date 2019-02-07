import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
  import Register from "./register";
  import Login from "./login";
 
class Main extends Component {
  render() {
    return (
        <HashRouter>
            <div>
            <h1>Park my Car</h1>
            <ul className="header">
                <li><NavLink to="/register">Register</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
            </ul>
            <div className="content">
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
            </div>
            </div>
        </HashRouter>
    );
  }
}
 
export default Main;