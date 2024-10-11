// src/components/EditProfile.js

import React, { useState, useEffect, useCallback } from 'react';
import { useUser } from '../context/UserContext';

const EditProfile = ({ user, toggleEdit }) => {
  const { updateUser } = useUser();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [error, setError] = useState('');

  // Update state when user prop changes
  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setBio(user.bio);
    setProfilePicture(user.profilePicture);
  }, [user]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    
    if (!name || !email || !bio) {
      setError('All fields are required.');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }

    setError('');
    
    // Update user data
    updateUser({ ...user, name, email, bio, profilePicture });
    toggleEdit();
  }, [name, email, bio, profilePicture, updateUser, user, toggleEdit]);

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Bio</label>
        <textarea 
          value={bio} 
          onChange={(e) => setBio(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Profile Picture URL</label>
        <input 
          type="text" 
          value={profilePicture} 
          onChange={(e) => setProfilePicture(e.target.value)} 
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit">Save</button>
      <button type="button" onClick={toggleEdit}>Cancel</button>
    </form>
  );
};

export default EditProfile;
