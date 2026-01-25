import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function Profile({
  clothingItems,
  handleOpenAddClothingModal,
  handleOpenItemModal,
  handleLogout,
  handleOpenEditProfileModal, // <-- use this if that's the correct handler
  weatherData,
  currentUser,
  isLoggedIn,
}) {  
  return (
    <div className="profile">
      <SideBar
        handleLogout={handleLogout}
        handleOpenEditProfileModal={handleOpenEditProfileModal} // <-- update prop name
        currentUser={currentUser}
        isLoggedIn={isLoggedIn}
      />
      <ClothesSection
        clothingItems={clothingItems}
        handleOpenAddClothingModal={handleOpenAddClothingModal}
        handleOpenItemModal={handleOpenItemModal}
        weatherData={weatherData}
        currentUser={currentUser}
      />
    </div>
  );
}

export default Profile;
