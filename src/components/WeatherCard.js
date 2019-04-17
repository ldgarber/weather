import React from "react"; 
//var Sunny = require('../assets/sunny.svg'); 

class WeatherCard extends React.Component {  
  render() {
    let icon_url = "http://openweathermap.org/img/w/" + this.props.icon + ".png"; 
    return(
      <div className="weather-card">
        <img className="weather-icon" src={icon_url} alt="weather"/>
        <h3>{this.props.city}, {this.props.country}</h3>
        <p>{this.props.description}</p>
        <p>{this.props.temp}˚F</p>
      </div>
    ); 
  } 
} 

export default WeatherCard; 
