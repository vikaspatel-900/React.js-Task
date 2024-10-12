// src/components/ProfileForm.js
import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import './UsersList.css';

const ProfileForm = ({ user = {}, onClose }) => {
  const { addUser, updateUser } = useUser();
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [bio, setBio] = useState(user.bio || '');
  const [profilePic, setProfilePic] = useState(user.profilePic || '');
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required.';
    if (!email || !email.includes('@')) newErrors.email = 'Valid email is required.';
    if (!bio) newErrors.bio = 'Bio is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setProfilePic(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newUser = { id: user.id || null, name, email, bio, profilePic };
    if (user.id) updateUser(newUser);
    else addUser(newUser);

    onClose();
  };

  useEffect(() => {
    fileInputRef.current.focus();
  }, []);

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h3>Form</h3>
      <input
        ref={fileInputRef}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && <p className="error">{errors.name}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className="error">{errors.email}</p>}

      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      {errors.bio && <p className="error">{errors.bio}</p>}

      <input type="file" onChange={handleFileChange} />
      <button type="submit" className="btn submit-btn">
        {user.id ? 'Update' : 'Add'}
      </button>
      <button type="button" onClick={onClose} className="btn close-btn">
        Close
      </button>
    </form>
  );
};

export default ProfileForm;
