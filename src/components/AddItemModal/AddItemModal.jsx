import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useform";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { useContext } from "react";

function AddItemModal({
  isOpen,
  handleCloseModal,
  handleSubmit,
  isFormValid,
  setIsFormValid,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange } = useForm({
    name: "",
    link: "",
    weather: "hot",
  });

  function onSubmit(e) {
    console.log("Form submitted!");
    e.preventDefault();
    handleSubmit(values);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Add Clothing"
      buttonText="Add Clothing"
      name="add-clothing-form"
      onClose={handleCloseModal}
      handleSubmit={onSubmit}
      isFormValid={isFormValid}
      setIsFormValid={setIsFormValid}
      currentUser={currentUser}
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="add-clothing-name" className="modal__label">
          Name
          <input
            id="add-clothing-name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
            className="modal__input"
            placeholder="Name"
            required
          />
        </label>
        <label className="modal__label" htmlFor="add-clothing-image">
          Image
          <input
            id="add-clothing-image"
            name="link"
            type="url"
            value={values.link}
            onChange={handleChange}
            className="modal__input"
            placeholder="Image URL"
            required
          />
        </label>
      </fieldset>
      <fieldset className="modal__fieldset">
        <legend>Select the weather type:</legend>

        <div className="modal__radio">
          <input
            className="modal__radio-btn"
            type="radio"
            id="hot"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          <label className="modal__radio-label" htmlFor="hot">
            Hot
          </label>
        </div>

        <div>
          <input
            className="modal__radio-btn"
            type="radio"
            id="warm"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <label className="modal__radio-label" htmlFor="warm">
            Warm
          </label>
        </div>

        <div>
          <input
            className="modal__radio-btn"
            type="radio"
            id="cold"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <label className="modal__radio-label" htmlFor="cold">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
