import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";


import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx"; 
import Profile from "../Profile/Profile.jsx";

import { addItem, getItems, deleteItem } from "../../utils/api.js";
import { getWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


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
      .catch((err) => {
      console.error(err);
      setClothingItems([]);
      });
  }, []);

  useEffect(() => {
  if (location.pathname === "/signup") {
    setActiveModal("register-modal");
  } else if (location.pathname === "/signin") {
    setActiveModal("login-modal");
  } else if (location.pathname === "/") {
    setActiveModal(""); // Close modals when returning home
  }
}, [location]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTempUnit, handleTempUnitChange }}
    >
      <div className="app">
        <Header
          isLoggedIn={isLoggedIn}
          handleOpenAddClothingModal={handleOpenAddClothingModal}
          handleSubmit={handleSubmit}
          onLoginClick={() => navigate("/signin")}
          onRegisterClick={() => navigate("/signup")} 
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
            path="/items"
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
                isLoggedIn={isLoggedIn}
                clothingItems={clothingItems}
                handleOpenAddClothingModal={handleOpenAddClothingModal}
                handleOpenItemModal={handleOpenItemModal}
              />
            }
          />

             <Route
             path="/signin"
             element={
        <Main
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
                onClose={handleCloseModal}
                weatherData={weatherData}
              />} />  
              
             <Route
             path="/signup"
             element={
         <Main
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
                onClose={handleCloseModal}
                weatherData={weatherData}
              />} />
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
           <LoginModal
          isOpen={activeModal === "login-modal"}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
          isFormValid={isFormValid}
          setIsFormValid={setIsFormValid}
        />
        <RegisterModal
          isOpen={activeModal === "register-modal"}
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
