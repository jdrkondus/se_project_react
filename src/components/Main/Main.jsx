import "../Main/Main.css";

import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";

function Main({ clothingItems, handleOpenItemModal, handleCloseItemModal }) {
  console.log("Clothing Items:", clothingItems);
  return (
    <>
      <main className="main">
        <WeatherCard />
        <p className="main__text">Today is 75°F / You may want to wear:</p>
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
    </>
  );
}

export default Main;
