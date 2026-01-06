import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({
  clothingItems,
  handleOpenItemModal,
  handleOpenAddClothingModal,
}) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__row">
        Your items
        <button
          className="clothes-section__btn"
          onClick={handleOpenAddClothingModal}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__card-list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              data={item}
              onCardClick={handleOpenItemModal}
            />
          );
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;
