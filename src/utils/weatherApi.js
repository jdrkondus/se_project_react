import { apiKey, coordinates } from "./constants";

export function getWeatherData() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.long}&units=imperial&appid=${apiKey}`;

  return fetch(url)
    .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Error from Weather API: ${res.status}`)
    )
    .then((data) => {
      return parseWeatherData(data);
    });
}

function parseWeatherData(data) {
  const parsedData = { temp: {} };

  parsedData.city = data.name;
  parsedData.temp.F = Math.round(data.main.temp);
  parsedData.temp.C = Math.round((parsedData.temp.F - 32) * (5 / 9));

  parsedData.weatherCondition = data.weather[0].main.toLowerCase();

  const timeStamp = Date.now();
  parsedData.timeStamp = timeStamp;
  parsedData.isDay = isDay(data.sys, timeStamp);

  return parsedData;
}

function getWeatherCondition() {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}

function isDay({ sunrise, sunset }, timeStamp) {
  const timeStampInSeconds = Math.floor(timeStamp / 1000);
  return sunrise < timeStamp && timeStamp < sunset;
}
