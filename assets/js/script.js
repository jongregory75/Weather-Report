//declare variables to display today, today + 1, etc

//var todayDay = moment .date .day of year .name
//Card header is today
//card header tomorrow = todayDay +1 = moment .date .day of year .name
var apiKey = "05a905770df38bb47d2a0c4f7c95efa9";
var cityButton = document.getElementById("btn-city-select");

var requestUrl =
  "https://api.github.com/orgs/nodejs/repoapi.openweathermap.org/data/2.5/weather?q={Denver}&appid={" +
  apiKey +
  "}s";
//
var apiKey = "05a905770df38bb47d2a0c4f7c95efa9";

$(document).ready(function () {
  $("#currentDay").text(moment().format("dddd, MMMM Do  YYYY"));

  var city = "";
  var long = "";
  var lat = "";

  function checkCity() {
    // fetch request gets a list of all the repos for the node.js organization

    //API Call for initial city weather
    //api.openweathermap.org/data/2.5/weather?q={city name}&appid={apiKey}

    //parse return for long / lat

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })

      .then(function (data) {
        console.log(data);
        //Loop over the data to generate a table, each table row will have a link to the repo url
        //for (var i = 0; i < data.length; i++) {
        // Creating data poins from object returned
      });

    //URLfor One Call API
    //https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
  }

  cityButton.addEventListener("click", checkCity);
});
