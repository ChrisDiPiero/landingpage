
class WeatherData {
    constructor(json) {
        this.tempF = this.tempToF(json.main.temp);
        this.tempC = this.tempToC(json.main.temp);
        this.humidity = json.main.humidity;
        this.windSpeed = this.windMetersPSToMPH(json.wind.speed);
        // this.windDir = this.windDegToDir(json.wind.deg); --- broken
    }

    tempToF(kelvin) {
        return ((kelvin - 273.15) * 1.8 + 32).toFixed(0);
    }
    tempToC(kelvin) {
        return (kelvin - 273.15).toFixed(0);
    }
    windMetersPSToMPH(speed) {
        return (speed * 2.2369).toFixed(1);
    }
    // windDegToDir(degrees) { --- why is this broken?
    //     let expr = parseInt(degrees);
    //     let direction;
    //     switch(expr) {
    //         case (expr > 23 && expr <= 69) :
    //             direction = "NE";
    //             break;
    //         case (expr <= 113) :
    //             direction = "E";
    //             break;
    //         case (expr <= 158) :
    //             direction = "SE";
    //             break;
    //         case ( expr <= 203) :
    //             direction = "S";
    //             break;
    //         case (expr <= 248) :
    //             direction = "SW";
    //             break;
    //         case (expr <= 293) :
    //             direction = "W";
    //             break;
    //         case (expr <= 338) :
    //             direction = "NW";
    //             break;
    //         case (expr <= 23) :
    //             direction = "N";
    //     }
    //     return direction;
    // }
}

const apiKey = '35212c2362c920fb78bcfbc661e77b86';

const url =
    'https://api.openweathermap.org/data/2.5/weather?q=san+antonio,us&APPID=' + apiKey;

$.ajax({
    url: url,
    type: "GET",
    dataType: "json",
})
    .done(function(json) {
        $("#weather").show();
        const CurrentWeather = new WeatherData(json);
        $("<div class='col-12'>").text(CurrentWeather.tempF).appendTo("#degreesF");
        $("<div class='col-12'>").text(CurrentWeather.tempC).appendTo("#degreesC");
        $("<div class='col-12'>").text(`${CurrentWeather.humidity} %`).appendTo("#humidity");
        $("<div class='col-12'>").text(`${CurrentWeather.windSpeed} mph`).appendTo("#wind");
    })

    .fail(function(xhr, status, errorThrown) {
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
    })

