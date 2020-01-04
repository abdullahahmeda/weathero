import React, { useEffect, useState } from "react";

const Card = ({ city }) => {
  console.log(city);
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [weatherInfo, setWeatherInfo] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  async function getLatAndLon(city) {
    const response = fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=f18e558463314a3d938f389a6cb4930d&language=en&pretty=1`
    )
      .then(res => res.json())
      .then(({ results }) => {
        setLat(results[0].geometry.lat);
        setLon(results[0].geometry.lng);
        return [results[0].geometry.lat, results[0].geometry.lng];
      });
    return response;
  }

  async function getWeatherInfo(lat, lon) {
    const weatherInfoResponse = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=61d73e45df80deb2df40e579474e2849`
    )
      .then(res => res.json())
      .then(({ main }) => main)
      .catch(
        error =>
          "Couldn't fetch weather data. Please check your internet connection"
      );
    return weatherInfoResponse;
  }

  useEffect(() => {
    getLatAndLon(city)
      .then(res =>
        getWeatherInfo(res[0], res[1])
          .then(weatherInfo => {
            setWeatherInfo(weatherInfo);
            setIsLoaded(true);
          })
          .catch(e => {
            setError(
              "Couldn't fetch weather data. Please check your internet connection"
            );
            setIsLoaded(true);
          })
      )
      .catch(e => {
        setError("Couldn't fetch this city");
        setIsLoaded(true);
      });
  }, []);

  if (isLoaded) {
    if (error) {
      return <div>{error}</div>;
    }
    return (
      <div className="weather-card z-depth-1 p-relative">
        <p>{city}</p>
        <p className="weather-temp p-absolute">{weatherInfo.temp}&deg; C</p>
      </div>
    );
  }
  return <div>Loading...</div>;
};

export default Card;
