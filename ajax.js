var countryWeather = {
    today: '05'
};
var countryId = [2306179, 1118370, 15015370, 31278, 2459115, 1132599];
var days = ['今天', '明天', '後天'];
var Time;
async function getWeatherAW(woeid) {
    try {
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
        const data = await result.json();

        //const Country = data.parent.title;   國家
        const City = data.title; //  城市
        Time = (data.time).slice(8, 10);
        console.log(Time);
        const Pngaddress = 'https://www.metaweather.com/static/img/weather/'; //  天氣小圖示 sn.svg

        for (let j = 0; j <= 2; j++) {

            const Weather = data.consolidated_weather[j].weather_state_name; //  今天天氣
            const WeatherAbb = data.consolidated_weather[j].weather_state_abbr; //  今天天氣簡寫

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



// countryId.forEach(function (ele) {
//     getWeatherAW(ele);
// });

//TODO: 判斷 localstorage 有無根據 countryId 建立的物件,沒有直接抓取新的天氣資料
// $(".custom-select").on('change', function () {
//     $("#shopping-cart tbody").html("");
//     var $input = $(this);
//     var country_id = $input.val();
//     if (!localStorage.countryWeather[countryId]) {

//     } else if (time) {

//         countryId.forEach(function (id) {
//             //getWeatherAW(country_id);
//         });
//     }


// });

// getWeatherAW(2306179);

//TODO: 有 countryId 建立的物件，再判斷今天的日期和 localstorage 日期，不同就要抓取新的天氣資料
var today = new Date().getDate().toString();