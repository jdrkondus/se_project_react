import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import Profile from "../Profile/Profile.jsx";

import { addItem, getItems, deleteItem } from "../../utils/api.js";
import { defaultClothingItems } from "../../utils/defaultClothingItems.js";
import { getWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [isFormValid, setIsFormValid] = useState(false);

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

  function handleSubmit(values) {
    const { name, link, weather } = values;
    console.log("addItem function called with:", {
      name,
      imageUrl: link,
      weather,
    });
    addItem({ name, imageUrl: link, weather })
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        setActiveModal("");
      })
      .catch(console.error);
  }
  function handleDeleteItem(item) {
    console.log(item);
    deleteItem(item._id)
      .then(() => {
        setClothingItems((prev) => prev.filter((i) => i._id !== item._id));
      })
      .catch(console.error);
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
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
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
        <Routes>
          <Route
            path="/"
            element={
              <Main
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
                onClose={handleCloseModal}
                weatherData={weatherData}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                clothingItems={clothingItems}
                handleOpenAddClothingModal={handleOpenAddClothingModal}
                handleOpenItemModal={handleOpenItemModal}
              />
            }
          />
        </Routes>

        <Footer />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "item-modal"}
          onClose={handleCloseModal}
          handleDeleteItem={handleDeleteItem}
        />
        <AddItemModal
          isOpen={activeModal === "header__add-clothing-modal"}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
          isFormValid={isFormValid}
          setIsFormValid={setIsFormValid}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
