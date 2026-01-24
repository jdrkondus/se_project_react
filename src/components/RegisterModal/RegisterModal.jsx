import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useform";
import {signUp} from "../../utils/auth.js";

function RegisterModal({
  isOpen,
  handleCloseModal,
  handleSubmit,
  isFormValid,
  setIsFormValid,
  handleOpenLoginModal,
  handleOpenRegisterModal,
}) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  function onSubmit(e) {
    console.log("Form submitted!");
    e.preventDefault();
    signUp(values)
      .then((data) => {
        console.log("User registered:", data);
        handleSubmit(values);
      }).then(() => {
        signIn({email: values.email, password: values.password})
          .then((data) => {
            console.log("User logged in after registration:", data);
            handleSubmit({email: values.email, password: values.password});
          })
      })
      .catch((err) => {
        console.error("Registration error:", err);
      });
  }

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
      handleOpenLoginModal={handleOpenLoginModal}
      handleOpenRegisterModal={handleOpenRegisterModal}
      onClick={handleOpenLoginModal}
    >
        <div className="register-modal">
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
        </label>
      </fieldset>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
