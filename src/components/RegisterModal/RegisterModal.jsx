import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useform";
import { useEffect } from "react";

function RegisterModal({
  isOpen,
  handleCloseModal,
  handleRegister,
  isFormValid,
  setIsFormValid,
  handleOpenLoginModal,
  handleOpenRegisterModal,
  registerError,
  currentUser,
  ...props
}) {

  const { values, handleChange, errors, setValues } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  // Reset form values when modal is opened and not just on mount
  useEffect(() => {
    if (isOpen) {
      setValues({
        email: "",
        password: "",
        name: "",
        avatar: "",
      });
    }
    // Only reset when modal is opened, not just on key change
    // eslint-disable-next-line
  }, [isOpen]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign Up"
      buttonText="Sign Up"
      secondButtonText="or Log In"
      name="registration-form"
      onClose={handleCloseModal}
      handleSubmit={onSubmit}
      isFormValid={isFormValid}
      setIsFormValid={setIsFormValid}
      onClick={handleOpenLoginModal}
    >
      <div className="register-modal">
        {registerError && (
          <div className="modal__error-message modal__error-message_global">
            {registerError}
          </div>
        )}
        <fieldset className="modal__fieldset">
          <label htmlFor="register-email" className="modal__label">
            Email
            <input
              id="register-email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              className="modal__input"
              placeholder="Email"
              required
            />
            {errors.email && (
              <div className="modal__error-message">
                {errors.email}
              </div>
            )}
          </label>
          <label htmlFor="register-password" className="modal__label">
            Password
            <input
              id="register-password"
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
          <label htmlFor="register-name" className="modal__label">
            Name
            <input
              id="register-name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              className="modal__input"
              placeholder="Name"
              required
            />
            {errors.name && (
              <div className="modal__error-message">
                {errors.name}
              </div>
            )}
          </label>
          <label className="modal__label" htmlFor="register-avatar">
            Avatar URL
            <input
              id="register-avatar"
              name="avatar"
              type="url"
              value={values.avatar}
              onChange={handleChange}
              className="modal__input"
              placeholder="Avatar URL"
              required
            />
            {errors.avatar && (
              <div className="modal__error-message">
                {errors.avatar}
              </div>
            )}
          </label>
        </fieldset>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
