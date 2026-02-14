import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, itemName }) {
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__container modal__container_type_delete">
        <button
          type="button"
          className="modal__close-btn"
          onClick={onClose}
        ></button>
        <h2 className="modal__title modal__title_type_delete">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </h2>
        <div className="modal__buttons">
          <button
            type="button"
            className="modal__delete-confirm-btn"
            onClick={onConfirm}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="modal__cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
