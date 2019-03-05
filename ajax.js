var countryWeather = {

};
var countryId = [2306179, 1118370, 15015370, 31278, 2459115, 1132599];
var days = ['今天', '明天', '後天', '大後天', '大大後天'];

async function getWeatherAW(woeid) {
    try {
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
        const data = await result.json();
        return data;
    } catch (error) {
        alert(error);
    }
}



$(".custom-select").on('change', function () {
    // countryWeather = JSON.parse(localStorage.countryWeather);
    $("#weather-table tbody").html("");
    var $input = $(this);
    var country_id = $input.val();

    if (country_id == '選擇城市')
        alert("Are you kidding?");
    else
        render(country_id);
});


countryId.forEach(function (id) {
    if (localStorage.countryWeather) {
        countryWeather = JSON.parse(localStorage.countryWeather);
        if (new Date().getDate() != countryWeather[id].day) {
            (async () => {
                countryWeather[id] = await getWeatherAW(id);
                countryWeather[id].day = new Date().getDate();
                localStorage.countryWeather = JSON.stringify(countryWeather);
            })()
        }
    } else {
        (async () => {
            countryWeather[id] = await getWeatherAW(id);
            countryWeather[id].day = new Date().getDate();
            localStorage.countryWeather = JSON.stringify(countryWeather);
        })()
    }
});


//(async () => {

// countryWeather[2306179] = await getWeatherAW(2306179)
// console.log(countryWeather[2306179])

//})()







function render(id) {
    //const Country = data.parent.title;   國家
    const City = countryWeather[id].title; //  城市
    //Time = (data.time).slice(8, 10);
    //console.log(Time);
    const Pngaddress = 'https://www.metaweather.com/static/img/weather/'; //  天氣小圖示 sn.svg

    for (let j = 0; j <= 4; j++) {

        const Weather = countryWeather[id].consolidated_weather[j].weather_state_name; //  今天天氣
        const WeatherAbb = countryWeather[id].consolidated_weather[j].weather_state_abbr; //  今天天氣簡寫

        let newAdd = Pngaddress.concat(WeatherAbb);
        let newAdd2 = newAdd.concat('.svg');


        let highT = parseInt(countryWeather[id].consolidated_weather[j].max_temp);
        let lowT = parseInt(countryWeather[id].consolidated_weather[j].min_temp);

        var itemHTML = `
        <tr>
            <td>${days[j]}</td>
            <td>${City}</td>
            <td>${Weather}</td>         
            <td>${highT}</td>         
            <td>${lowT}</td>     
            <td><img class="weather_pic" src="${newAdd2}" alt=""></td>    
        </tr>
        `
        $("#weather-table tbody").append(itemHTML);
    }
}