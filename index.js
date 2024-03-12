const apikey = '9a6f73a8f3dfc96fb60b7e9846dcd132';
let weatherData = {};

window.onload = function() {
    const cards = document.querySelectorAll('.card-content');
    const fetchPromises = [];
  
    cards.forEach(card => {
      const cityName = card.querySelector('#cityName').textContent;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}&units=metric`;
      fetchPromises.push(fetch(url).then(response => response.json()));
    });
  
    Promise.all(fetchPromises)
      .then(results => {
        results.forEach((data, index) => {
          weatherData[data.name] = data;
          displayWeather(data, cards[index].querySelector('#card-icon'));
        });
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };
    const today = new Date();
    const month=(today.getMonth()+1);
    const date=today.getDate();
    const hour=today.getHours();
    const min=today.getMinutes();
    const sec=today.getSeconds();　


    
    document.querySelectorAll('.card-content').forEach(card => {
      card.addEventListener('click', function() {
        const mainRight = document.querySelector('.main-right');
        mainRight.classList.add('fade-in');
      });
    });

function displayWeather(data, weatherIcon) {
    const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.innerHTML = '<img src="' + iconUrl + '" alt="Weather Icon" />';
    document.querySelectorAll('.card-content').forEach(card => {
      card.addEventListener('click', function() {
          const cityName = card.querySelector('#cityName').textContent; 
        
          if (weatherData.hasOwnProperty(cityName)) {
              const cityWeather = weatherData[cityName]; 

            const cityNamesMap = {
                'Keelung': '基隆市',
                'Taipei': '臺北市',
                'New Taipei': '新北市',
                'Taoyuan City': '桃園市',
                'Hsinchu': '新竹市',
                'Miaoli': '苗栗市',
                'Taichung': '臺中市',
                'Changhua': '彰化市',
                'Nantou': '南投市',
                'Yunlin County': '雲林縣',
                'Jiayi': '嘉義市',
                'Tainan City': '臺南市',
                'Kaohsiung City': '高雄市',
                'Pingtung City': '屏東市',
                'Yilan': '宜蘭市',
                'Hualien City': '花蓮市',
                'Taitung City': '臺東市',
                'Penghu County': '澎湖縣'
                };          
              if (cityNamesMap[cityWeather.name]) {
                cityWeather.name = cityNamesMap[cityWeather.name];
              }
            const weatherState ={
                'Clear':'晴朗無雲 ☀️',
                'Rain':'下雨 ☔',
                'Drizzle':'綿綿細雨 🌧️',
                'Thunderstorm':'雷陣雨⛈️',
                'Fog':'起霧🌫️',
                'Clouds':'陰天 ☁️',
                'Haze':'霧霾',
                'Mist':'薄霧'
           } // https://tw.piliapp.com/emoji/list/weather/
            if(weatherState[cityWeather.weather[0].main]){
                cityWeather.weather[0].main = weatherState[cityWeather.weather[0].main];
            }
            

              document.getElementById('city-name').innerHTML = `${cityWeather.name}  `;
              document.getElementById('time').innerHTML =`更新時間: ${month}/${date} ${hour}:${min}:${sec}`;
              document.getElementById('temp').innerHTML = `當前氣溫: ${cityWeather.main.temp} °C` ;
              document.getElementById('weather').innerHTML = `天氣: ${cityWeather.weather[0].main}`;
              document.getElementById('sunrise').innerHTML = `日出: ${new Date(cityWeather.sys.sunrise * 1000).toLocaleTimeString()}`;
              document.getElementById('sunset').innerHTML = `日落: ${new Date(cityWeather.sys.sunset * 1000).toLocaleTimeString()}`;
              




          } else {
              console.error('No weather data found for city:', cityName);
          }
      });
  });
}
