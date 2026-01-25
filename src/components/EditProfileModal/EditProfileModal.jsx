import "./EditProfileModal.css";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useContext, useState, useEffect } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx';

function EditProfileModal({ 
    isOpen, 
    onClose, 
    handleEditProfile,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.data?.name || '');
  const [avatar, setAvatar] = useState(currentUser?.data?.avatar || '');
  
    useEffect(() => {
        if(isOpen) {
            setName(currentUser?.data?.name || '');
            setAvatar(currentUser?.data?.avatar || '');
        }
    }, [isOpen, currentUser])



  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Edit Profile"
      buttonText="Save changes"
      name="edit-profile-modal"
      onSubmit={handleEditProfile}
        onClose={onClose}
    >
        <label className="modal__label">Name*
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      </label>
      <label className="modal__label">Avatar*
      <input
        type="url"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        placeholder="Avatar URL"
        required
      />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;