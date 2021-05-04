var apiKey = "b332282f910be7fa8ffff49f3e6cd500";
//var cityButton = document.getElementById("btn-city-select");
var coord = "";
var city = "";
var long = "";
var lat = "";
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

  //var citySelectBtn = document.getElementById("btn-city-select");
  //var citySelectVal = document.getElementById("cityNameInput");
  //   var btn = document.getElementById("btn-city-select");
  //   btn.setAttribute("btn-city-select", searchHistory[i]);
  //   console.log(btn.textContent);
  //   btn.textContent = searchHistory[i];
  //   city = btn.textContent;
  //   searchHistoryContainer.append(btn);

  //citySelectBtn.onclick = buildCityUrl(citySelectVal);

  function buildCityUrl(city) {
    var cityUrl = baseUrl + "weather?q=" + city + "&appid=" + apiKey;

    checkCity(cityUrl);
  }

  function checkCity(cityUrl) {
    fetch(cityUrl)
      .then((response) => response.json())

      .then(function (data) {
        grabLatLon(data);
        console.log(data);
      });
  }

  function grabLatLon(dataIn) {
    long = dataIn.coord.lon;
    lat = dataIn.coord.lat;

    oneCallUrl =
      baseUrl + "onecall?lat=" + lat + "&lon=" + long + "&appid=" + apiKey;
    console.log(oneCallUrl);
    getOneCallApi(oneCallUrl);
  }

  //calls the One Call API Url and returns the One Call Data
  function getOneCallApi(oneCallUrl) {
    fetch(oneCallUrl)
      .then((response) => response.json())

      .then(function (oneCallData) {
        console.log(oneCallData);
      });
  }
});

function handleSearchFormSubmit(event) {
  event.preventDefault();
}
