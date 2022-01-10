import { useState } from "react";
import "./App.css";
import dateBuilder from "./components/DateBuilder/dateBuilder";

const api = {
  key: "f9e5839374520c232cada9540783f608",
  base: "http://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  function descriptionUpperCase() {
    const string = weather.weather[0].description;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
          if (result.cod === "404") {
            alert(result.message);
          } else {
            return result;
          }
        });
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app cold"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}ºc</div>
              <div className="weather">{descriptionUpperCase()}</div>
            </div>
          </div>
        ) : (
          <div>
            <div className="location-box">
              <div className="location">Search for a location</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
