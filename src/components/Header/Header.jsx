import "../Header/Header.css";

import Logo from "../../assets/logo.svg";
import Avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleOpenAddClothingModal, weatherData }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <header className="header">
        <div className="header__side">
          <img src={Logo} alt="WTWR logo" className="header__logo" />
          <p className="header__place">
            <time dateTime={now} className="header__datetime">
              {dateStr}
            </time>
            , {weatherData.city}
          </p>
        </div>
        <div className="header__side">
          <ToggleSwitch />
          <button
            onClick={handleOpenAddClothingModal}
            className="header__add-clothing-btn"
          >
            + Add Clothes
          </button>
          <p className="header__username">Terrence Tegegne</p>
          <img src={Avatar} alt="Terrence Avatar" className="header__avatar" />
        </div>
      </header>
    </>
  );
}

export default Header;
