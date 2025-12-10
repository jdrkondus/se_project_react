import "../Header/Header.css";

import Logo from "../../assets/logo.svg";
import Avatar from "../../assets/avatar.svg";

function Header() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <>
      <header className="header">
        <img src={Logo} alt="WTWR logo" className="header__logo" />
        <p className="header__place">
          <time dateTime={now} className="header__datetime">
            {dateStr}
          </time>
          , Pensacola
        </p>
        <button className="header__add-clothes-btn">+ Add Clothes</button>
        <p className="header__username">Terrence Tegegne</p>
        <img src={Avatar} alt="Terrence Avatar" className="header__avatar" />
      </header>
    </>
  );
}

export default Header;
