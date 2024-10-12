// src/components/Profile.js
import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import './UsersList.css';

const Profile = ({ user, onEdit }) => {
  const { deleteUser } = useUser();
  const [showHistory, setShowHistory] = useState(false);

  const toggleHistory = () => setShowHistory((prev) => !prev);

  return (
    <div className="profile-card">
      <div className="profile-pic">
        <img src={user.profilePic} alt="Profile" />
      </div>
      <h3>{user.name}</h3>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio}</p>

      <div className='edit-delete-btn'>
        <button onClick={() => onEdit(user)} className="btn edit-btn">
        <i class="bi bi-pencil-square"></i>
        </button>
        <button onClick={() => deleteUser(user.id)} className="btn delete-btn">
        <i class="bi bi-trash3"></i>
        </button>
      </div>

      <button onClick={toggleHistory} className="btn history-btn">
        {showHistory ? 'Hide History' : 'Show Changes History'}
      </button>

      {showHistory && (
        <div className="history">
          <h4>Change History</h4>
          <ul>
            {user.history.length > 0 ? (
              user.history.map((entry, index) => <li key={index}>{entry}</li>)
            ) : (
              <li>No changes made yet.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
