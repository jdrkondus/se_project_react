import { useContext } from "react";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import { weatherConditionImages } from "../../utils/constants";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const contextValue = useContext(CurrentTemperatureUnitContext);

  const displayTemp =
    contextValue.currentTempUnit == "F"
      ? weatherData.temp.F
      : weatherData.temp.C;

  return (
    <section className="weather-card">
      <img
        src={
          weatherConditionImages[weatherData.isDay ? "day" : "night"][
            weatherData.weatherCondition
          ]?.image ||
          weatherConditionImages[weatherData.isDay ? "day" : "night"]["default"]
            ?.image
        }
        alt={weatherData.weatherCondition}
        className="weather-card__image"
      />
      <p className="weather-card__temp">
        {displayTemp} &deg; {contextValue.currentTempUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
