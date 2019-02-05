import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
     locations: [],
     selectedLocation: "",
     validationError: "",
     selectedAvailability:"",
     showAvailability = "",
   };
 }

onChange(){
  {(e) => this.setState({selectedLocation: e.target.value, validationError: e.target.value === "" ? "You must select your location" : ""})}
  if(this.state.selectedLocation != ''){
    const newUser = {
            userProfileId: this.state.firstName,
            date : '2019-02-01'
        }
      axios.post('http://0.0.0.0:5000/checkAvailability', newUser)
            .then(res => 
                showAvailability = res.available
              )
            .catch(err => console.log(err));
  }
}
 componentDidMount() {
  fetch("http://0.0.0.0:5000/getAllLocations")
  .then((response) => {
    return response.json();
  })
  .then(data => {
    let teamsFromApi = data.map(location => { return {value: location.split('-')[0], display: location.split('-')[1]} })
    this.setState({ locations: [{value: '', display: 'Select your location'}].concat(teamsFromApi) });
  }).catch(error => {
    console.log(error);
  });
}
render() {
  return (
    <div className="Home">
    <div className="lander">
    <div>
    <select value={this.state.selectedLocation} 
    onChange={this.onC{(e) => this.setState({selectedLocation: e.target.value, validationError: e.target.value === "" ? "You must select your location" : ""})}hange}>
    {this.state.locations.map((location) => <option key={location.value} value={location.value}>{location.display}</option>)}
      </select>
      <div style={{color: 'red', marginTop: '5px'}}>
      {this.state.validationError}
      
      </div>
      </div>
      </div>
      </div>
      );
  }
}
