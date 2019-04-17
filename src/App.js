import React, { Component } from 'react';
import {geolocated} from 'react-geolocated'; 
import WeatherCard from "./components/WeatherCard"; 
import "./App.css"; 

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;  

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async () => {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=london,uk&units=imperial&appid=${API_KEY}`); 

    const response = await api_call.json();
    console.log(response);

    this.setWeatherStateFromAPIResponse(response); 
  } 

  setWeatherStateFromAPIResponse = (response) => {
    this.setState({
      temperature: response.main.temp,
      city: response.name,
      country: response.sys.country,
      humidity: response.main.humidity,
      description: response.weather[0].description,
      wind: response.wind.speed, 
      icon: response.weather[0].icon, 
      error: ""
    });  
  } 

  getWeatherFromCoords = async (lat, lon) => {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`); 

    const response = await api_call.json();
    console.log(response);

    this.setWeatherStateFromAPIResponse(response); 
  } 

  render() {
    let state = this.state; 
    return <div>
             <button onClick={this.getWeather}>Get Weather</button>   
      { this.props.coords? 
        <button onClick={() => this.getWeatherFromCoords(this.props.coords.latitude, this.props.coords.longitude)}>Get Weather At Your Location</button> : null
      } 
      { state && state.icon && 
         <WeatherCard temp={state.temperature} icon={state.icon} />
      } 
        </div>
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false, 
  }, 
  userDecisionTimeout: 5000, 
})(App);
