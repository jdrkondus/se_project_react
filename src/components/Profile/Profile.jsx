import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleOpenAddClothingModal,
  handleOpenItemModal,
}) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        handleOpenAddClothingModal={handleOpenAddClothingModal}
        handleOpenItemModal={handleOpenItemModal}
      />
    </div>
  );
}

export default Profile;
