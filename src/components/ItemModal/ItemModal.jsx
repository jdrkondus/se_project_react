import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";



function ItemModal({ card, isOpen, onClose, handleDeleteItem, isOwn, itemDeleteButtonClassName }) {
  const currentUser = useContext(CurrentUserContext);
  
  function handleDeleteClick() {
    handleDeleteItem(card);
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
          <button onClick={handleDeleteClick} className={itemDeleteButtonClassName} disabled={!isOwn}>
            Delete
          </button>
        </div>
      </div>
    </div>
   
  );
}

export default ItemModal;
