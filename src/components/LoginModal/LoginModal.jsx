import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useform";
import { useState, useContext } from "react"; 
import CurrentUserContext from "../../contexts/CurrentUserContext.js";  


function LoginModal({
  isOpen,
  handleCloseModal,
  handleSubmit,
  isFormValid,
  setIsFormValid,
  handleOpenRegisterModal,
  handleOpenLoginModal,
  handleLogin,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, setErrors } = useForm({
    email: "",
    password: "",
  });
  const [serverError, setServerError] = useState("");

function onSubmit(event) {
  event.preventDefault();
  setServerError("");
  handleLogin(values)
    .then(() => {
      handleCloseModal();
    })
    .catch((err) => {
      console.error("Login error:", err);
      setServerError("Email or password is incorrect.");
    });
}

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Log In"
      buttonText="Log In"
      secondButtonText=" or Sign Up"
      name="login-form"
      onClose={handleCloseModal}
      handleSubmit={onSubmit}
      isFormValid={isFormValid}
      setIsFormValid={setIsFormValid}
      handleOpenRegisterModal={handleOpenRegisterModal}
      handleOpenLoginModal={handleOpenLoginModal}
      onClick={handleOpenRegisterModal}
      handleLogin={handleLogin}
      currentUser={currentUser}
    >
      
      <div className="login-modal">
        <fieldset className="modal__fieldset">
          <label htmlFor="login-email" className="modal__label">
            Email
            <input
              id="login-email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className="modal__input"
              placeholder="Email"
              required
            />
            {errors.email && (
              <div className="modal__error-message" >
                {errors.email}
              </div>
            )}
          </label>
          <label htmlFor="login-password" className="modal__label">
            Password
            <input
              id="login-password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              className="modal__input"
              placeholder="Password"
              required
            />
            {errors.password && (
              <div className="modal__error-message">
                {errors.password}
              </div>
            )}
          </label>
        </fieldset>
      </div>
    {serverError && (
  <div
    className="modal__error-message"
  >
    {serverError}
  </div>
)}
    </ModalWithForm>
  );
}

export default LoginModal;
