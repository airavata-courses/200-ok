import React, { Component } from "react";
import {
  Button,
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import "./Signup.css";
import axios from "axios";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      firstname: "",
      lastname: "",
      username: "",
      password: "",
    };
  }


  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
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
  // handleConfirmationSubmit = async event => {
  //   event.preventDefault();

  //   this.setState({ isLoading: true });
  // }


  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="firstname" bsSize="large">
          <ControlLabel>FirstName</ControlLabel>
          <FormControl
            value={this.state.firstname}
            onChange={this.handleChange}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="lastname" bsSize="large">
          <ControlLabel>Last name</ControlLabel>
          <FormControl
            value={this.state.lastname}
            onChange={this.handleChange}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="username" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.username}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            text="Signup"
          >
            Signup
          </Button>
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {
          this.renderForm()
        }
      </div>
    );
  }
}
