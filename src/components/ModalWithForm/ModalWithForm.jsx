import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  children,
  handleSubmit,
  title,
  buttonText,
  name,
  onClose,
  isFormValid,
  setIsFormValid,
}) {
  return (
    <div className={` modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__container modal__container_type_form">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close-btn modal__close-btn_type_form"
          onClick={onClose}
        ></button>
        <form
          onSubmit={handleSubmit}
          className="modal__form"
          name={name}
          onChange={(e) => setIsFormValid(e.currentTarget.checkValidity())}
        >
          {children}

          <button
            type="submit"
            className="modal__submit-btn"
            disabled={!isFormValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
