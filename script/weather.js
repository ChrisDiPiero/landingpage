
class WeatherData {
    constructor(json) {
        this.tempF = this.tempToF(json.main.temp);
        this.lowF = this.tempToF(json.main.temp_min);
        this.highF = this.tempToF(json.main.temp_max);

        this.tempC = this.tempToC(json.main.temp);
        this.lowC = this.tempToC(json.main.temp_min);
        this.highC = this.tempToC(json.main.temp_max);
    }

    tempToF(kelvin) {
        return ((kelvin - 273.15) * 1.8 + 32).toFixed(0);
    }
    tempToC(kelvin) {
        return (kelvin - 273.15).toFixed(0);
    }
}

const apiKey = '35212c2362c920fb78bcfbc661e77b86';

const url =
    'https://api.openweathermap.org/data/2.5/weather?q=san+antonio&APPID=' + apiKey;

$.ajax({
    url: url,
    type: "GET",
    dataType: "json",
})
    .done(function(json) {
        $("#weather").show();
        const CurrentWeather = new WeatherData(json);
        $("<div class='col-12'>").text(`Now: ${CurrentWeather.tempF} Low: ${CurrentWeather.lowF} Hi: ${CurrentWeather.highF}`).appendTo("#degreesF");
        $("<div class='col-12'>").text(`Now: ${CurrentWeather.tempC} Low: ${CurrentWeather.lowC} Hi: ${CurrentWeather.highC}`).appendTo("#degreesC");
    })

    .fail(function(xhr, status, errorThrown) {
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    })

