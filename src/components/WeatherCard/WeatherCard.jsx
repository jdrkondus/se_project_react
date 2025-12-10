import cloudy from "../../assets/cloudy.svg";
import "./WeatherCard.css";

function WeatherCard() {
  return (
    <>
      <section className="weather-card">
        <img
          src={cloudy}
          alt="cloudy weather"
          className="weather-card__image"
        />
        <p className="weather-card__temp"> 75°F </p>
      </section>
    </>
  );
}

export default WeatherCard;
