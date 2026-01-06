import "./SideBar.css";
import Avatar from "../../assets/avatar.svg";

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__row">
        <img src={Avatar} alt="Terrence Avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </aside>
  );
}

export default SideBar;
