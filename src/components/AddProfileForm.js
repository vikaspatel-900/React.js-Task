// src/components/AddProfileForm.js

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import './Compo.css'

const AddProfileForm = ({ closeForm }) => {
  const { addUser } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    profilePicture: '',
  });
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef();

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email is required';
    setErrors(newErrors);
  }, [formData]);

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        profilePicture: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      addUser(formData);
      closeForm();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-profile-form">
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="form-group">
        <label>Bio</label>
        <textarea name="bio" value={formData.bio} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Profile Picture</label>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} />
      </div>
      <button type="submit">Add Profile</button>
      <button type="button" onClick={closeForm}>Cancel</button>
    </form>
  );
};

export default AddProfileForm;
