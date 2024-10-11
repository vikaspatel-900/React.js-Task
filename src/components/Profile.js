// src/components/Profile.js

import React, { useState, useCallback } from 'react';
import { useUser } from '../context/UserContext';
import EditProfile from './EditProfile';
import ChangeHistory from './ChangeHistory';
import './Compo.css'

const Profile = ({ user }) => {
  const { deleteUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // State for showing history

  const handleEditToggle = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${user.name}'s profile?`)) {
      deleteUser(user.id);
    }
  };

  const toggleHistory = () => {
    setShowHistory((prev) => !prev); // Toggle the history visibility
  };

  return (
    <div className="profile-container">

      {!isEditing ? (
        <div className='data'>
          <img src={user.profilePicture || 'https://via.placeholder.com/150'} alt="Profile" className="profile-picture" />
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
          <div className='btn'>
            <button onClick={handleEditToggle}>Edit Profile</button>
            <button onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>Delete Profile</button>
            <button onClick={toggleHistory} style={{ marginLeft: '10px' }}>
              {showHistory ? 'Hide Change History' : 'Show Change History'}
            </button>
          </div>





          {showHistory && <ChangeHistory history={user.history || []} />} {/* Pass user history */}
        </div>
      ) : (
        <EditProfile toggleEdit={handleEditToggle} user={user} />
      )}
    </div>
  );
};

export default Profile;
