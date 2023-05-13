import React, { Component } from 'react';
//isomorphic-fetch is required to use the Fetch API
import 'isomorphic-fetch';
import './App.css';
//in this task i have used react-bootstrap as im starting to find it much easier
import {Form, Button} from 'react-bootstrap';
import Weather from './Components/Weather';

//Set Initial State
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false, //set loaded to false by default
            data: {},
            Area: '',
            Lang: ''
        };

    //Binding so "this" works
    this.handleChange = this.handleChange.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
    this.fetchWeather = this.fetchWeather.bind(this);
    }

    //Record value for Area Name
    handleChange (e){
        this.setState({Area: e.target.value});
    }

    //Record value for Language
    handleLanguage (e){
        this.setState({Lang: e.target.value});
    }

    fetchWeather(){
        let Area = this.state.Area;
        let Lang = this.state.Lang;
        /*the below is my API link which is configured to get the metric data (Celcius), i wanted to create a "unit select form" but im running out of time
        to graduate so i made use of the language selection from the API to show flexibility*/
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Area}&units=metric&APPID=30dd0bad1ebb74e5978d66894b20a48f&lang=${Lang}`)
        .then(res => res.json())
        .then(
            (data) => {
                console.log("data", data);
                this.setState({
                    isLoaded: false,
                    data
                });
            },

            //From Example: 
            // Note: it's important to handle errors here  instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: false,
                    error
                });
            })
    }


    returnWeather(){
        let { error, isLoaded, data } = this.state;
        console.log(" error", error, "isLoaded", isLoaded, 'data', data);
        if (error) {
            return <div>Error: {error.message}</div>;
        }else if (data.hasOwnProperty('message')){
            return <div style={{textTransform: "capitalize"}}>{data.message}</div>;
        }else if (isLoaded) {
            return <div>Getting Data</div>;
        }else if (data.hasOwnProperty('weather')) {
            return <Weather data={data}/>
        }else{
            return ""
        }
    }

    render() {
     return(
        <div>
        <div className='input-field'>  
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" 
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous" />
            <h1>L2T14 - Weather App</h1>
            <br></br>
            <Form>
            <Form.Group>
            <Form.Control type="text" placeholder="Please Enter Area"  value={this.state.Area} onChange = {this.handleChange}/>
            </Form.Group>
            <Form.Group>
            <Form.Control type="text" placeholder="Please enter language code eg. en, af, zu, nl"  value={this.state.Lang} onChange = {this.handleLanguage}/>
            </Form.Group>
            <Button className="btn btn-primary" type="button" onClick={this.fetchWeather}>Check Weather</Button>
            </Form>
            {this.returnWeather()}
        </div>
        </div>

     )
    }
}
export default App
