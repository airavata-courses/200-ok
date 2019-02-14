import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname:'',
      lastname:'',
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
    var form_value_url = 'http://localhost:8080/api/register?firstname='+this.state.firstname+'&lastname='+this.state.lastname+'&username='+this.state.username+'&password='+this.state.password;
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
        <label htmlFor="">First Name:</label>
        <input name="firstname" type="text" value={this.state.firstname} onChange={this.handleChange} />
        <br></br>
        <label htmlFor="lastname">Last Name:</label>
        <input name="lastname" type="text" value={this.state.lastname} onChange={this.handleChange} />
        <br></br>
        <label htmlFor="username">Username:</label>
        <input name="username" type="text" value={this.state.username} onChange={this.handleChange} />
        <br></br>
        <label htmlFor="password">Password:</label>
        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} />
        <br></br>
        <input type="submit" value="Register" />
      </form>

    );
  }
}

export default Register;