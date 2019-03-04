var countryId = [2306179, 1118370, 15015370, 31278];
var days = ['今天', '明天', '後天'];

async function getWeatherAW(woeid) {
    try {
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
        const data = await result.json();

        for (let j = 0; j <= 2; j++) {
            //const Country = data.parent.title;   國家
            const City = data.title; //  城市
            const Weather = data.consolidated_weather[j].weather_state_name; //  今天天氣
            const WeatherAbb = data.consolidated_weather[j].weather_state_abbr; //  今天天氣簡寫
            let Time = data.time;
            const Pngaddress = 'https://www.metaweather.com/static/img/weather/'; //  天氣小圖示 sn.svg


            let time = Time.slice(0, 10);

            let newAdd = Pngaddress.concat(WeatherAbb);
            let newAdd2 = newAdd.concat('.svg');


            let highT = parseInt(data.consolidated_weather[j].max_temp);
            let lowT = parseInt(data.consolidated_weather[j].min_temp);

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
            $("#shopping-cart tbody").append(itemHTML);
        }
        return data;
    } catch (error) {
        alert(error);
    }
}



countryId.forEach(function (ele) {
    getWeatherAW(ele);
});