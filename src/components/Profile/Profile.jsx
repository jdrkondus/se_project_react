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
  handleEditProfile,
  weatherData,
}) {  
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="profile">
      <SideBar
      handleLogout={handleLogout}
      handleEditProfile={handleEditProfile}
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
