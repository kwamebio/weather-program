let weather = {
    "apiKey":"d26d19af2fde567e1fc4f89cdb187f32",
    fetchWeather: function(city) {
        fetch( 
            "http://api.openweathermap.org/data/2.5/weather?q=" 
            + city + "&APPID=" 
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather(data) {
        const { name } = data;
        const{ icon, description } = data.weather[0];
        const { temp, humidity} = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed)
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".description").innerText =description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";

    },
    search: function() {
       this.fetchWeather(document.querySelector(".search-bar").value); 
    }
};

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();

});