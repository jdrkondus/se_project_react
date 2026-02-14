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
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal.jsx";
import Profile from "../Profile/Profile.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

import { addItem, getItems, deleteItem, getCurrentUser, updateProfile, likeItem, dislikeItem } from "../../utils/api.js";
import { signIn, signUp, signOut, validateToken, updateUserProfile } from "../../utils/auth.js";
import { getWeatherData } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { use } from "react";
import { useForm } from "../../hooks/useform.js";


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
  const [token, setToken] = useState(() => localStorage.getItem("jwt")); 
  const [registerError, setRegisterError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [registerModalKey, setRegisterModalKey] = useState(() => `register-${Date.now()}`);
  const [editProfileModalKey, setEditProfileModalKey] = useState(() => `edit-profile-${Date.now()}`);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleOpenLoginModal = () => {
    setActiveModal("login-modal");
  };

  const handleOpenRegisterModal = () => {
    setRegisterError(""); 
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
    setRegisterError(""); 
    setLoginError("");
    setItemToDelete(null);
  }

  async function handleLogin(values) {
    try {
      const res = await signIn(values);
      if (res.token) {
        localStorage.setItem("jwt", res.token); 
        setToken(res.token);
        
        const userData = await getCurrentUser(res.token);
        setCurrentUser(userData);
        setIsLoggedIn(true);
        navigate("/profile");
      }
      return res.data;
    } catch (err) {
      console.error("Login error:", err);
      setLoginError(err);
      throw err;
    }
  }

  async function handleRegister(values) {
    setRegisterError("");
    try {
      const res = await signUp(values);
      if (res.token) {
        localStorage.setItem("jwt", res.token); 
        setToken(res.token);
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        handleCloseModal();
        setRegisterModalKey(`register-${Date.now()}`); 
        navigate("/profile");
      }
      return res.data;
    } catch (err) {
      console.error("Registration error:", err);
      setRegisterError(err);
      throw err;
    }
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
        setClothingItems((prev) => {
          // Check if item already exists to avoid duplicates
          if (prev.some(item => item._id === data._id)) {
            return prev;
          }
          return [data, ...prev];
        });
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
    updateProfile(token, { name, avatar })
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        setActiveModal("");
        setEditProfileModalKey(`edit-profile-${Date.now()}`); 
      })
      .catch(console.error);
  }

  function handleDeleteItem(item) {
    setItemToDelete(item);
    setActiveModal("delete-confirmation");
  }

  function confirmDeleteItem() {
    if (itemToDelete) {
      deleteItem(itemToDelete._id, token)
        .then(() => {
          setClothingItems((prev) => prev.filter((i) => i._id !== itemToDelete._id));
          handleCloseModal();
        })
        .catch(console.error);
    }
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
    localStorage.removeItem("jwt"); 
    setToken(null);
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/");
  }

  function handleCardLike(item, isLiked) {
    if (!isLoggedIn) {
      navigate("/signin");
      return;
    }

    const apiCall = isLiked ? dislikeItem : likeItem;
    
    apiCall(item._id, token)
      .then((updatedItem) => {
        setClothingItems((prev) =>
          prev.map((cardItem) => 
            cardItem._id === item._id ? updatedItem : cardItem
          )
        );
      })
      .catch(console.error);
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
        // Deduplicate items based on _id
        const uniqueItems = Array.from(
          new Map(items.map(item => [item._id, item])).values()
        );
        
        // Debug: Check for duplicates
        const ids = items.map(i => i._id);
        const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
        if (duplicates.length > 0) {
          console.warn('Duplicate IDs found:', duplicates);
        }
        
        setClothingItems(uniqueItems);
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
    setActiveModal("");
  }
}, [location]);

useEffect(() => {
  
  if (token) {

    validateToken(token)
      .then((data) => {
        if (data) {
          setCurrentUser(data);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        // Only sign out if the error is due to invalid/expired token
        if (
          err?.status === 401 ||
          err?.message === "jwt expired" ||
          err?.message === "invalid token" ||
          (typeof err === "string" && err.includes("Error: 401"))
        ) {
          setCurrentUser({});
          setIsLoggedIn(false);
          signOut();
          localStorage.removeItem("jwt");
          if (location.pathname !== "/signin") {
            navigate("/signin");
          }
        } else {
          // For other errors (e.g., network), do not sign out
          console.error("Token validation error (not signing out):", err);
        }
      });
  }
}, [token, location.pathname, navigate]);

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
                handleCardLike={handleCardLike}
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
                handleCardLike={handleCardLike}
            
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
                handleCardLike={handleCardLike} 
                handleUpdateUser={handleUpdateUser}
                handleLogout={handleLogout}
                onClose={handleCloseModal}
                weatherData={weatherData}
                currentUser={currentUser}
                updateUserProfile={updateUserProfile}
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
                handleCardLike={handleCardLike}
              
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
                handleCardLike={handleCardLike}
               
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
          key={registerModalKey}
          isOpen={activeModal === "register-modal"}
          handleCloseModal={handleCloseModal}
          isFormValid={isFormValid}
          setIsFormValid={setIsFormValid}
          handleOpenLoginModal={handleOpenLoginModal}
          handleOpenRegisterModal={handleOpenRegisterModal}
          handleRegister={handleRegister}
          registerError={registerError}
          currentUser={currentUser}
        />
       <EditProfileModal
  key={editProfileModalKey}
  isOpen={activeModal === "edit-profile-modal"}
  onClose={handleCloseModal} 
  isFormValid={isFormValid}
  setIsFormValid={setIsFormValid}
  currentUser={currentUser}
  handleEditProfile={handleUpdateUser} 
/>
        <DeleteConfirmationModal
          isOpen={activeModal === "delete-confirmation"}
          onClose={handleCloseModal}
          onConfirm={confirmDeleteItem}
          itemName={itemToDelete?.name}
        />
      </div>
      </CurrentUserContext.Provider>  
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
