import "../Header/Header.css";
import { Link } from "react-router-dom";

import Logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";


function Header({ isLoggedIn, onLoginClick, onRegisterClick, handleOpenAddClothingModal,weatherData }) {
 
  const currentUser=useContext(CurrentUserContext);

  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <header className="header">
        <div className="header__side">
          <Link className="header__link" to="/">
            <img src={Logo} alt="WTWR logo" className="header__logo" />
          </Link>
          <p className="header__place">
            <time dateTime={now} className="header__datetime">
              {dateStr}
            </time>
            , {weatherData.city}
          </p>
        </div>
        <div className="header__side">
          <ToggleSwitch />
                {!isLoggedIn ? (
            <>
            <button onClick={onRegisterClick} className="header__btn">
                Sign Up
              </button>
              <button onClick={onLoginClick} className="header__btn">
                Log in
              </button>
              
            </>
          ) : (
            <>
          <button
            onClick={handleOpenAddClothingModal}
            className="header__btn"
          >
            
            + Add Clothes
          </button>
        <Link className="header__link" to="/profile">
          <p className="header__username">{currentUser?.data?.name}</p>
          <img
            src={
              currentUser?.data?.avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
            alt={`${currentUser?.data?.name} avatar`}
            className="header__avatar"
          />
        </Link>
          </>
        )}
      </div>
    </header>
  </>
  );
}

export default Header;
