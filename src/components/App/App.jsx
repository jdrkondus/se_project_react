import { useEffect, useState } from "react";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

import { defaultClothingItems } from "../../utils/defaultClothingItems.js";
import { getWeatherData } from "../../utils/weatherApi.js";
import "./App.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleOpenAddClothingModal() {
    setActiveModal("header__add-clothing-modal");
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleSubmit() {
    setActiveModal("");
    setSelectedCard({});
  }

  function handleTempUnitChange() {
    if (currentTempUnit == "F") {
      setCurrentTempUnit("C");
    } else {
      setCurrentTempUnit("F");
    }
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTempUnit, handleTempUnitChange }}
    >
      <div className="app">
        <Header
          handleOpenAddClothingModal={handleOpenAddClothingModal}
          handleSubmit={handleSubmit}
          weatherData={weatherData}
        />
        <Main
          clothingItems={clothingItems}
          handleOpenItemModal={handleOpenItemModal}
          onClose={handleCloseModal}
          weatherData={weatherData}
        />
        <Footer />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "item-modal"}
          onClose={handleCloseModal}
        />
        <ModalWithForm
          isOpen={activeModal === "header__add-clothing-modal"}
          title="Add Clothing"
          buttonText="Add Clothing"
          name="add-clothing-form"
          onClose={handleCloseModal}
        >
          <fieldset className="modal__fieldset">
            <label htmlFor="add-clothing-name" className="modal__label">
              Name
              <input
                id="add-clothing-name"
                type="text"
                className="modal__input"
                placeholder="Name"
              />
            </label>
            <label className="modal__label" htmlFor="add-clothing-image">
              Image
              <input
                id="add-clothing-image"
                type="url"
                className="modal__input"
                placeholder="Image URL"
              />
            </label>
          </fieldset>
          <fieldset className="modal__fieldset">
            <legend>Select the weather type:</legend>

            <div className="modal__radio">
              <input
                className="modal__radio-btn"
                type="radio"
                id="hot"
                name="weather"
                value="hot"
              />
              <label className="modal__radio-label" htmlFor="hot">
                Hot
              </label>
            </div>

            <div>
              <input
                className="modal__radio-btn"
                type="radio"
                id="warm"
                name="weather"
                value="warm"
              />
              <label className="modal__radio-label" htmlFor="warm">
                Warm
              </label>
            </div>

            <div>
              <input
                className="modal__radio-btn"
                type="radio"
                id="cold"
                name="weather"
                value="cold"
              />
              <label className="modal__radio-label" htmlFor="cold">
                Cold
              </label>
            </div>
          </fieldset>
        </ModalWithForm>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
