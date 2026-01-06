import "./ItemModal.css";

function ItemModal({ card, isOpen, onClose, handleDeleteItem }) {
  function deleteItem() {
    handleDeleteItem(card);
    onClose();
  }
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__container">
        <button
          className="modal__close-btn"
          type="button"
          onClick={onClose}
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__text">{card.name}</h2>
          <p className="modal__text">Weather: {card.weather}</p>
          <button onClick={deleteItem} className="modal__delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
