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
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import Profile from "../Profile/Profile.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

import { addItem, getItems, deleteItem } from "../../utils/api.js";
import { getWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { signIn, signOut, signUp, validateToken } from "../../utils/auth.js";
import { use } from "react";

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
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem("jwt"));

  const handleOpenLoginModal = () => {
    setActiveModal("login-modal");
  };

  const handleOpenRegisterModal = () => {
    setActiveModal("register-modal");
  };  

  const handleOpenEditProfileModal = () => {
    setActiveModal("edit-profile-modal");
  };


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

  async function handleLogin(values) {
    try {
      const res = await signIn(values);
      if (res.token) {
        localStorage.setItem("jwt", res.token);
        setToken(res.token);
        setIsLoggedIn(true);
        setCurrentUser(res.data);
        navigate("/profile");
      }
      return res.data;
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  }
  function handleRegister(values) {
    return signUp(values)
    .then((res) => {
      const token = res.token;
      localStorage.setItem("jwt", token);
      setToken(token);
      console.log("Registration successful:", res);
      handleCloseModal();
      navigate("/profile");
      return handleLogin({ email: values.email, password: values.password });
      
    })
    .catch((err) => {
      console.error("Registration error:", err);
      throw err;
    });
    
  
  }

  function handleSubmit(values) {
    const { name, link, weather } = values;
    console.log("addItem function called with:", {
      name,
      imageUrl: link,
      weather,
    });
    addItem({ name, imageUrl: link, weather, token })
      .then((data) => {
        setClothingItems((prev) => [data, ...prev]);
        setActiveModal("");
      })
      .catch(console.error);
  }

    function handleUpdateUser(values) {
    const { name, avatar } = values;
    console.log("UpdateUser called with ", {
      name,
      imageUrl: avatar,
    });
    updateUser({ name, imageUrl: avatar, token })
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        setActiveModal("");
      })
      .catch(console.error);
  }

  function handleDeleteItem(item) {
    console.log(item);
    deleteItem(item._id, token)
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

  function handleLogout() {
    signOut();
    setToken(null);
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if(token) {
      getItems({ token })
        .then((items) => {
          setClothingItems(items);
        })
        .catch((err) => {
          console.error(err);
          setClothingItems([]);
        });
    }
  }, [token]);

  useEffect(() => {
  if (location.pathname === "/signup") {
    setActiveModal("register-modal");
  } else if (location.pathname === "/signin") {
    setActiveModal("login-modal");
  } else if (location.pathname === "/") {
    setActiveModal("");
  }
}, [location]);

useEffect(() => {
  
  if (token) {

    validateToken(token).then((res) => {
      console.log("Token is valid. User data:", res);
      if(res) {
      setCurrentUser(res);
      setIsLoggedIn(true);
    }}).catch((err) => {
      console.error("Token validation error:", err);
      setCurrentUser({});
      setIsLoggedIn(false);
      signOut();
      setToken(null);
    });
  }
}, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTempUnit, handleTempUnitChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
 

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
              <ProtectedRoute isLoggedIn={isLoggedIn} >
              <Profile
                isLoggedIn={isLoggedIn}
                clothingItems={clothingItems}
                handleOpenAddClothingModal={handleOpenAddClothingModal}
                handleOpenItemModal={handleOpenItemModal}
                handleOpenEditProfileModal={handleOpenEditProfileModal} 
                handleUpdateUser={handleUpdateUser}
                handleLogout={handleLogout}
                onClose={handleCloseModal}
                weatherData={weatherData}
                currentUser={currentUser}
             />
              </ProtectedRoute>
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
                handleOpenLoginModal={handleOpenLoginModal}
                handleOpenRegisterModal={handleOpenRegisterModal}
                handleLogin={handleLogin}
              
              />} />  
              
             <Route
             path="/signup"
             element={
         <Main
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
                onClose={handleCloseModal}
                weatherData={weatherData}
                 handleOpenLoginModal={handleOpenLoginModal}
                handleOpenRegisterModal={handleOpenRegisterModal}
                handleLogin={handleLogin}
               
              />} />
        </Routes>

        <Footer />
        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "item-modal"}
          onClose={handleCloseModal}
          handleDeleteItem={handleDeleteItem}
          currentUser={currentUser}
          isOwn={selectedCard.owner === currentUser?._id}
          itemDeleteButtonClassName={
            selectedCard.owner === currentUser?._id
              ? "modal__delete-btn"
              : "modal__delete-btn modal__delete-btn_disabled"
          }
        />
        <AddItemModal
          isOpen={activeModal === "header__add-clothing-modal"}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
          isFormValid={isFormValid}
          setIsFormValid={setIsFormValid}
          currentUser={currentUser}
        />
           <LoginModal
          isOpen={activeModal === "login-modal"}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
          isFormValid={isFormValid}
          setIsFormValid={setIsFormValid}
          handleOpenRegisterModal={handleOpenRegisterModal}
          handleLogin={handleLogin}
          currentUser={currentUser}
        />
        <RegisterModal
          isOpen={activeModal === "register-modal"}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
          isFormValid={isFormValid}
          setIsFormValid={setIsFormValid}
          handleOpenLoginModal={handleOpenLoginModal}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
          currentUser={currentUser}
        />
        <EditProfileModal
          isOpen={activeModal === "edit-profile-modal"}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
          isFormValid={isFormValid}
          setIsFormValid={setIsFormValid}
          currentUser={currentUser}
          handleOpenEditProfileModal={handleOpenEditProfileModal} 
          handleUpdateUser={handleUpdateUser}
        />
      </div>
      </CurrentUserContext.Provider>  
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
