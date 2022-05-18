import React, {useState, useEffect} from "react";
const api = {
  key: "3b9669ce784eae23bf11fca67ff6cc4c",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  // useEffect(() =>{
  //   var today = new Date(),

  //   time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  //   return `${time}`
  // });
  
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log('Hii');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  const timeBuilder = (t) => {
    var today = new Date(),

    time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    return `${time}`

  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div><br></br>
            <div className="date">{dateBuilder(new Date())}</div><br></br>
            <div className="date">{timeBuilder()}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}

{weather.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              <div className="FL_icon"></div>
              {weather.main ? <p className='bold'>{weather.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
            <div className="hum_icon"></div>
              {weather.main ? <p className='bold'>{weather.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
            <div className="WS_icon"></div>
              {weather.wind ? <p className='bold'>{weather.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }


      </main>
    </div>
  );
}

export default App;
