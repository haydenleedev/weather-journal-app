/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let newDate = months[d.getMonth()]+' '+ d.getDate()+', '+ d.getFullYear();

/*
Acquire API credentials from OpenWeatherMap website. Use your credentials and the base url to create global variables

API call:
api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}

Examples of API calls:
api.openweathermap.org/data/2.5/weather?zip=94040,us

*/

const baseURL = "http://api.openweathermap.org/data/2.5/weather?units=imperial&appid=";
const apiKey = "06d98b9baf12282536df1ef97c23a5a9";

// Write an async function that uses fetch() to make a GET request to the OpenWeatherMap API.
const getData = async (baseURL, apiKey, zip) => {

	const response = await fetch(baseURL + apiKey + zip);

	try {
		const newData =  await response.json();
		console.log("url: " + baseURL + apiKey + zip);
		return newData;

	} catch(error) {
		console.log("error", error);
	}
}


// Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked.

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
	let zip = "&zip=" + document.getElementById('zip').value + ",us";
	let feelings = document.getElementById('feelings').value;
  

	getData(baseURL, apiKey, zip)
	.then(function(data) {
		postData('/addWeather', {date:newDate, name:data.name, country:data.sys.country, humidity:data.main.humidity, wind:data.wind.speed, weather:data.weather[0].main, weather_description:data.weather[0].description, main:data.main.temp, main_temp_max: data.main.temp_max, main_temp_min: data.main.temp_min, feels_like: data.main.feels_like, feelings: feelings})
	}).then(() => updateUI());
}

const postData = async ( url= '', data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}


const updateUI = async () => {
	const request = await fetch('/all');

	try {
		const allData = await request.json();

	//	const updateUI = JSON.stringify(allData);

		//let count = allData.length - 1;

		document.getElementById("date").innerHTML = allData.date;

		document.getElementById("temp").innerHTML =`<div class="header">${allData.name}, ${allData.country} Weather
		as of ${allData.date}</div>
		
		
		<div class="overview">Today: ${allData.weather_description} currently. The high will be ${allData.main_temp_max}° and a low of ${allData.main_temp_min}°.</div>
		
		
		<div class="hilite">${allData.main}°</div>
		<div class="sub">${allData.weather}</div>
		
		<div class="sub-head">${allData.feels_like}°</div>
		<div class="normal">Feels Like</div>
		
		<div class="table">
		<div>High/Low</div>   <div>${allData.main_temp_max}°/ ${allData.main_temp_min}°</div>
		<div>Humidity</div>   <div>${allData.humidity} %</div>
		<div>Wind</div>      <div>${allData.wind}   mph</div>
		</div>`
		document.getElementById("content").innerHTML = allData.feelings;
		

	} catch (error) {
		console.log("error", error);

	}
}


