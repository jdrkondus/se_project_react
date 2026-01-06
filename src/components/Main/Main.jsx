import "../Main/Main.css";
import { useContext } from "react";

import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function Main({ clothingItems, handleOpenItemModal, weatherData }) {
  const contextValue = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="main__text">
        Today is {""}
        {contextValue.currentTempUnit == "F"
          ? weatherData.temp.F
          : weatherData.temp.C}{" "}
        &deg; {contextValue.currentTempUnit}/ You may want to wear:
      </p>
      <ul className="main__card-list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              data={item}
              onCardClick={handleOpenItemModal}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
