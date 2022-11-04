// const { domainToASCII } = require("url");

/* Global Variables */
const baseUrl='https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=004635ad189ffa4f3eec08158bb2e843&units=imperial'
//http://api.openweathermap.org/data/2.5/weather?zip={zip}&appid={apiKey}
const zipInput = document.getElementById('zip');
const feelingsInput = document.getElementById('feelings');
const generateBtn = document.getElementById('generate');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'-'+ d.getDate()+'-'+ d.getFullYear();

// Get the weather data from the api
const getWeatherData = async (url)=>{
    const res = await fetch(url);
    try{
        const data = await res.json();
        return data;
    }catch(error){
        console.log('error',error);
        // appropriately handle the error
    }
}

// post data
const postData = async (url = '', data = {})=>{
    const response = await fetch(url, {
        method:'POST',
        credentials:'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try{
        // Transform into JSON
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log('error', error);
        // appropriately handle the error
    }
} 

// Function to GET Project Data and update UI
const updateUI = async () =>{
    const request = await fetch('/all');
    try {
    // Transform into JSON
    const allData = await request.json()
    console.log(allData)
    // Write updated data to DOM elements
    temp.innerHTML = Math.round(allData.temp)+ 'degrees';
    content.innerHTML = allData.content;
    date.innerHTML =allData.date;
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
}

// Generate function
const generate = ()=>{
    const zip = zipInput.value;
    const feelings = feelingsInput.value;
    const url = baseUrl+zip+apiKey;
    getWeatherData(url)
        .then((data)=>{
            postData('/data', {date: newDate, temp: data.main.temp, content: feelings})
            updateUI();
        });
}

// add event listener to the generate button
generateBtn.addEventListener('click', generate);