import { useContext } from "react";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import cloudy from "../../assets/cloudy.svg";
import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  const contextValue = useContext(CurrentTemperatureUnitContext);

  const displayTemp =
    contextValue.currentTempUnit == "F"
      ? weatherData.temp.F
      : weatherData.temp.C;
  return (
    <section className="weather-card">
      <img src={cloudy} alt="cloudy weather" className="weather-card__image" />
      <p className="weather-card__temp">
        {displayTemp} &deg; {contextValue.currentTempUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
