import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useContext, useState, useEffect } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx';
import { useForm } from "../../hooks/useform";


function EditProfileModal({ 
    isOpen, 
    onClose, 
    isFormValid, 
    setIsFormValid,
    currentUser,
    handleEditProfile,
    editProfileError
}) {
  const { values, handleChange, errors, setValues } = useForm({
    name: currentUser?.name || "",
    avatar: currentUser?.avatar || "",
  });

    useEffect(() => {
      if (isOpen) {
        setValues({
          name:  "",
          avatar:  "",
        });
      }
    }, [isOpen]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleEditProfile(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Edit Profile"
      buttonText="Save changes"
      name="edit-profile-modal"
      handleSubmit={onSubmit}
      isFormValid={isFormValid}
      setIsFormValid={setIsFormValid}
      onClose={onClose}
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="edit-name" className="modal__label">
          Name
          <input
            id="edit-name"
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
        <label htmlFor="edit-avatar" className="modal__label">
          Avatar URL
          <input
            id="edit-avatar"
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
    </ModalWithForm>
  );
}

export default EditProfileModal;