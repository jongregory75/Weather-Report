var apiKey1 = "b332282f910be7fa8ffff49f3e6cd500";
apiKey2 = "69a45c4ce47da9d049d6e6617b57a97f";
//var cityButton = document.getElementById("btn-city-select");
var coord = "";
var city = "";
var long = "";
var lat = "";
var oneCallData;
var oneCallUrl = "";
var baseUrl = "http://api.openweathermap.org/data/2.5/";
var cityUrl = "";

$(document).ready(function () {
  $("#currentDay").text(moment().format("dddd, MMMM Do  YYYY"));

  $(".btn-city-select").on("click", function () {
    city = $(this).siblings(".cityNameInput").val();
    console.log(city);
    var cityName = "cityName";
    cityValue = city;

    //put city input into local storage
    localStorage.setItem(cityName, JSON.stringify(cityValue));
    buildCityUrl(city);
  });

  //Builds city url for 1st api call
  function buildCityUrl(city) {
    var cityUrl =
      baseUrl + "weather?q=" + city + "&units=imperial" + "&appid=" + apiKey1;

    checkCity(cityUrl);
  }

  //Handles promise object
  function checkCity(cityUrl) {
    fetch(cityUrl)
      .then((response) => response.json())

      .then(function (data) {
        grabLatLon(data);
        console.log(data);
      });
  }

  //Gets latitude and longitude from 1st api call object
  function grabLatLon(dataIn) {
    long = dataIn.coord.lon;
    lat = dataIn.coord.lat;

    oneCallUrl =
      baseUrl +
      "onecall?lat=" +
      lat +
      "&lon=" +
      long +
      "&units=imperial" +
      "&appid=" +
      apiKey2;
    console.log(oneCallUrl);
    getOneCallApi(oneCallUrl);
  }

  //calls the One Call API Url and returns the One Call Data
  function getOneCallApi(oneCallUrl) {
    fetch(oneCallUrl)
      .then((response) => response.json())

      .then(function (oneCallData) {
        //TODO Assign variable to

        console.log(oneCallData);
        displayCurrentWeather(oneCallData.current);
        displayForecastWeather(oneCallData.daily);
      });
  }

  function displayCurrentWeather(oneCallData) {
    var temp = oneCallData.temp;
    var windSpeed = oneCallData.wind_speed;
    var humidity = oneCallData.humidity;
    var uvi = oneCallData.uvi;
    var iconUrl = `https://openweathermap.org/img/w/${oneCallData.weather[0].icon}.png`;
    var iconDescription = oneCallData.weather[0].description || weather[0].main;

    //outer div class="card"
    var card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("width", "18rem");
    //div class="card-body"
    var cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    //class=car-title
    var heading = document.createElement("h2");
    heading.setAttribute("class", "h3 card-title");
    //Temp element
    var tempEl = document.createElement("p");
    tempEl.setAttribute("class", "card-text");
    //Wind element
    var windEl = document.createElement("p");
    windEl.setAttribute("class", "card-text");
    //Humidity Element
    var humidityEl = document.createElement("p");
    humidityEl.setAttribute("class", "card-text");
    //UV Index info and color items
    var uvEl = document.createElement("p");
    var uviColor = document.createElement("button");
    uvEl.textContent = "UV Index: ";

    //add weather icons to cards
    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("src", iconUrl);
    weatherIcon.setAttribute("alt", iconDescription);
    weatherIcon.setAttribute("class", "weather-img");

    //heading.textContent = `${city} (${date})`;
    //add temp content
    tempEl.textContent = `Temp: ${temp}°F`;
    //add wind content
    windEl.textContent = `Wind: ${windSpeed} MPH`;
    //add humidity content
    humidityEl.textContent = `Humidity: ${humidity} %`;

    heading.append(weatherIcon);
    card.append(cardBody);
    console.log(cardBody);

    cardBody.append(heading, tempEl, windEl, humidityEl);
    //Generate UV color index using Bootstrap colors
    uviColor.classList.add("btn", "btn-sm");
    if (uvi < 3) {
      uviColor.classList.add("btn-success");
    } else if (uvi < 7) {
      uviColor.classList.add("btn-warning");
    } else {
      uviColor.classList.add("btn-danger");
    }

    uviColor.textContent = uvi;
    uvEl.append(uviColor);
    cardBody.append(uvEl);

    //initialize todays forecast container as empty
    todayContainer.innerHTML = "";
    todayContainer.append(card);
  }

  function displayForecastCard(forecastData) {
    // variables for data from api
    var unixTs = forecastData.dt;
    var iconUrl = `https://openweathermap.org/img/w/${forecastData.weather[0].icon}.png`;
    var iconDescription = forecastData.weather[0].description;
    var temp = forecastData.temp.day;
    var { humidity } = forecastData;
    var windMph = forecastData.wind_speed;
    //build url for forecast card weather icon
    var iconUrl = `https://openweathermap.org/img/w/${forecastData.weather[0].icon}.png`;
    var iconDescription = forecastData.weather[0].description;

    //div class="card"
    var card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("width", "18rem");

    //div class="card-body"
    var cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    //class=car-title
    var heading = document.createElement("h2");
    heading.setAttribute("class", "h3 card-title");
    //Temp element
    var tempEl = document.createElement("p");
    tempEl.setAttribute("class", "card-text");
    //Wind element
    var windEl = document.createElement("p");
    windEl.setAttribute("class", "card-text");
    //Humidity Element
    var humidityEl = document.createElement("p");
    humidityEl.setAttribute("class", "card-text");
    //UV Index info and color items
    var uvEl = document.createElement("p");
    var uviColor = document.createElement("button");
    uvEl.textContent = "UV Index: ";
    // Add content to elements
    heading.textContent = dayjs.unix(unixTs).format("M/D/YYYY");
    //add weather icons to cards
    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute("src", iconUrl);
    weatherIcon.setAttribute("alt", iconDescription);
    weatherIcon.setAttribute("class", "weather-img");

    tempEl.textContent = `Temp: ${temp} °F`;
    windEl.textContent = `Wind: ${windMph} MPH`;
    humidityEl.textContent = `Humidity: ${humidity} %`;
    //col.append(card);
    card.append(cardBody);

    cardBody.append(heading, weatherIcon, tempEl, windEl, humidityEl);
    forecastContainer.append(card);
    console.log(card);
  }

  // Function to display 5 day forecast.
  function displayForecastWeather(forecastData) {
    // Create unix timestamps using dayjs for start and end of 5 day forecast

    var startDt = dayjs().add(1, "day").startOf("day").unix();
    var endDt = dayjs().add(6, "day").startOf("day").unix();

    var headingContainer = document.createElement("div");
    headingContainer.setAttribute("class", "row-10");

    //initialize the forecastContainer as empty
    forecastContainer.innerHTML = "";
    forecastContainer.append(headingContainer);
    console.log(headingContainer);

    //loops through daily objects, checks day and calls the functiont to build each forecast card
    for (var i = 0; i < forecastData.length; i++) {
      if (forecastData[i].dt >= startDt && forecastData[i].dt < endDt) {
        displayForecastCard(forecastData[i]);
      }
    }
  }
});

function handleSearchFormSubmit(event) {
  event.preventDefault();
}
