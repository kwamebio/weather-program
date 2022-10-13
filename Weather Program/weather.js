class App{
    city = "";
    description = "";
    temp = "";
    humidity = "";
    wind = "";
    apiKey = "d26d19af2fde567e1fc4f89cdb187f32";


constructor(city, description, temp, humidity, wind) {
    this.city = city;
    this.description = description;
    this.temp = temp;
    this.humidity = humidity;
    this.wind = wind;
}

setInnerText(selector, value) {
    document.querySelector(selector).innerText = value;
  }

  async fetchWeather(city) {
    const response = await window.fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&APPID=" +
          this.apiKey
      );
      const data = await response.json();
      return this.displayWeather(data);
    }



convertTemp(temp) {
    return (temp - 273.15).toFixed(2);
}

    
    displayWeather(data) {
        const { name } = data;
        const{ icon, description } = data.weather[0];
        const { temp, humidity} = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed)

        this.renderNewUI({
            city: "Weather in " + name,
            description,
            temp: this.convertTemp(temp) + "°C",
            humidity: "Humidity: " + humidity + "%",
            wind: "Wind speed: " + speed + " km/h"
          });
        

    }


    renderNewUI(values) {
        this.setInnerText(this.city, values.city);
        this.setInnerText(this.description, values.description);
        this.setInnerText(this.temp, values.temp);
        this.setInnerText(this.humidity, values.humidity);
        this.setInnerText(this.wind, values.wind);
    }

      search() {
        const searchValue = document.getElementById("search-bar").value;
        this.setInnerText(this.city, `Weather in ${searchValue}`);
        this.fetchWeather(searchValue);
      }

}

document.querySelector(".search button").addEventListener("click", function(){
    weather.search();

});

const weather = new App (".city", ".description", ".temp", ".humidity", ".wind");
