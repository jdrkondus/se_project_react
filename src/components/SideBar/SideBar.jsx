import "./SideBar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({
 handleLogout, 
  handleOpenEditProfileModal,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  const name = isLoggedIn ? currentUser?.name : "Guest";
  const avatar = isLoggedIn ? currentUser?.avatar : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  return (
    <aside className="sidebar">
      <div className="sidebar__row">
        <img src={avatar} alt={`${name} Avatar`} className="header__avatar" />
        <p className="sidebar__username">{name}</p>
      </div>
      <button className="header__btn" type="button" onClick={handleOpenEditProfileModal}>
        Change Profile Data    
      </button>
      <button className="header__btn" type="button" onClick={handleLogout} >
        Log Out
      </button>
    </aside>
  );
}

export default SideBar;
