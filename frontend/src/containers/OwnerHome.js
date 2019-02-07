import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from "axios";

export default class OwnerHome extends Component {
  constructor(props) {
    super(props);

    this.state = {    
      garageId: "",
      userId: "",
      address: "",
      city: "",
      zipcode: "",
      numberOfSpots: ""
    };
  }

  validateForm() {
    //return this.state.email.length > 0 && this.state.password.length > 0;
    return true
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const garageData = {
        user_profile_id : this.state.userId,
        address : this.state.address,
        city : this.state.city,
        pincode : this.state.zipcode            
    }
    var form_value_url = 'http://localhost:3003/add_parking';
    axios({
      method: 'post',
      url: form_value_url,
      headers:{"Content-Type":"application/json"},
      data: garageData,
      crossdomain: true
      })
      .then(function (response) {
        //handle success
        this.props.userHasAuthenticated(true);
        this.props.history.push("/Home");
      })
      .catch(function (response) {
        //handle error
        alert(response);
    });
  }

  render() {
    return (
      <div className="OwnerHome">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="userId" bsSize="large">
            <ControlLabel>User ID</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              name="user_profile_id"
              value={this.state.userId}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="address" bsSize="large">
            <ControlLabel>Address</ControlLabel>
            <FormControl
              autoFocus
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="city" bsSize="large">
            <ControlLabel>City</ControlLabel>
            <FormControl
              value={this.state.city}
              name="city"
              onChange={this.handleChange}
              type="text"
            />
          </FormGroup>
          <FormGroup controlId="zipcode" bsSize="large">
            <ControlLabel>Zip Code</ControlLabel>
            <FormControl
              value={this.state.zipcode}
              name="pincode"
              onChange={this.handleChange}
              type="text"
            />
          </FormGroup>
          <FormGroup controlId="numberOfSpots" bsSize="large">
            <ControlLabel>Number of Spots</ControlLabel>
            <FormControl
              value={this.state.numberOfSpots}
              name="numberOfSpots"
              onChange={this.handleChange}
              type="text"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
