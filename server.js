// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8080;

const server = app.listen(port, listening);

function listening() {
	console.log("server running");
	console.log(`running on localhose: ${port}`);
}




// POST route - add a POST route that adds incoming data to projectData
/*
The POST route should anticipate receiving three pieces of data from the request body
1. temperature
2. date
3. user response

Make sure your POST route is setup to add each of these values with a key to projectData
*/
app.post('/addWeather', addWeather);

function addWeather(req,res){
  const test1 = JSON.stringify(req.body);
    console.log("addWeather1: " + test1);
    newEntry = {
      date: req.body.date,
      name: req.body.name,
      country: req.body.country,
      humidity: req.body.humidity,
      wind: req.body.wind,
     // country: req.body.sys.country,
      weather: req.body.weather,
      weather_description: req.body.weather_description,
      main: req.body.main,
      main_temp_max: req.body.main_temp_max,
      main_temp_min: req.body.main_temp_min,
      feels_like: req.body.feels_like,
      feelings: req.body.feelings
    }
    projectData = newEntry;

    projectData.push(projectData);
    res.send(projectData);
}

// GET route - Add a GET route that returns the projectData object
app.get('/all', getData);

function getData (request, response) {
  response.send(projectData);

};