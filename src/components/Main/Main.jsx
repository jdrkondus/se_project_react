import "../Main/Main.css";
import { useContext } from "react";

import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Main({ clothingItems, handleOpenItemModal, weatherData, handleCardLike }) {
  const contextValue = useContext(CurrentTemperatureUnitContext);
  const currentUser = useContext(CurrentUserContext);

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
              handleCardLike={handleCardLike}
              currentUser={currentUser}
            />
          );
        })}
      </ul>
    </main>
  );
}

export default Main;
