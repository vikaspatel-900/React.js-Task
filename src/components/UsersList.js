// src/components/UsersList.js
import React, { useState } from 'react';
import Profile from './Profile';
import ProfileForm from './ProfileForm';
import { useUser } from '../context/UserContext';
import './UsersList.css';

const UsersList = () => {
  const { users } = useUser();
  const [isAdding, setIsAdding] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const toggleAddForm = () => setIsAdding((prev) => !prev);

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsAdding(false);
  };

  return (
    <div className="users-list">
      
      <div className='add-profile-btn'>
        <div></div>
      <h3>User Profile Management System</h3>
        <button onClick={toggleAddForm} className="btn">
          {isAdding ? 'Close Add Form' : 'Add Profile'}
        </button>
      </div>

      <div className='profileForm-parent'>
        
        {isAdding && <ProfileForm onClose={toggleAddForm} />}
        {editingUser && (
          <ProfileForm user={editingUser} onClose={() => setEditingUser(null)} />
        )}
      </div>

      <div className='profile-card-parent'>
        {users.map((user) => (
          <Profile key={user.id} user={user} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
