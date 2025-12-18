import { apiKey, coordinates } from "./constants";

export function getWeatherData() {
  const { lat, long } = coordinates;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;

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

  return parsedData;
}
