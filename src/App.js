import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"; 
import {geolocated} from 'react-geolocated'; 
import Geosuggest from 'react-geosuggest'; 
import Home from "./components/Home"; 
import FiveDay from "./components/FiveDay"; 
import WeatherCard from "./components/WeatherCard"; 
import "./App.css"; 
import "./geosuggest.css"; 

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;  

class App extends Component {
  state = {
    location_description: "", 
    location: undefined, 
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  componentWillReceiveProps({coords}) {
    if (coords) {
      this.getWeatherFromCoords(coords.latitude, coords.longitude); 
      this.getFiveDayForecastFromCoords(coords.latitude, coords.longitude); 
    } 
  } 

  onSuggestSelect = (suggest) => {
    if (suggest && suggest.location !== null) {
      let location = suggest.location; 
      this.setState({ 
        location: location, 
        location_description: suggest.description
      }); 
      this.getWeatherFromCoords(this.state.location.lat, this.state.location.lng); 
    } 
  }

  setForecastFromAPIResponse = (response) => {
    //store 5-day forecast data in state somehow
    this.setState({
    }); 
  } 

  getWeather = async () => {
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=london,uk&units=imperial&appid=${API_KEY}`); 

    const response = await api_call.json();
    console.log(response);

    this.setState({ location_description: null }); 
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
      error: "", 
    });  
  } 

  getWeatherFromCoords = async (lat, lon) => {
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`); 

    const response = await api_call.json();
    console.log(response);

    this.setWeatherStateFromAPIResponse(response); 
  } 

  getFiveDayForecastFromCoords = async (lat, lon) => {
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`); 

    const response = await api_call.json();
    console.log(response);

    this.setForecastFromAPIResponse(response);   
  } 


  render() {
    let state = this.state; 
    return (
        <div>
          <header>
            <div>
              <div className="centered">
                <h1>Current Weather</h1>

                {/* <button onClick={this.getWeather}>Get Weather In London</button> */} 
                <div>
                  <h4>Enter your location</h4>
                  <Geosuggest 
                    onSuggestSelect={this.onSuggestSelect} 
                  />
                </div>
                { this.props.coords? 
                  <button onClick={() => this.getWeatherFromCoords(this.props.coords.latitude, this.props.coords.longitude)}>Use My Location</button> : null
                } 
              </div>
            </div>
          </header>

        { (state && state.icon) ? 
          <WeatherCard 
            temp={state.temperature} 
            icon={state.icon} 
            location_description={state.location_description}
            description={state.description} 
            city={state.city}
            country={state.country}
          /> : null 
        } 
        </div>
    )
  }
} 

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false, 
  }, 
  userDecisionTimeout: 5000, 
})(App);
