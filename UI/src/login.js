import React from 'react';
import './index.css';
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    var form_value_url = 'http://localhost:8080/api/login?&username='+this.state.username+'&password='+this.state.password;
    axios({
      method: 'get',
      url: form_value_url,
      headers: {"Content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
      crossdomain: true
      })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
    });
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
        <br></br>
        <label htmlFor="password">Password:</label>
        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
        <br></br>
        <input type="submit" value="Login" />
      </form>

    );
  }
}

export default Login;