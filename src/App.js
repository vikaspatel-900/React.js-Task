// src/App.js

import React, { useState } from 'react';
import './App.css';
import Profile from './components/Profile';
import AddProfileForm from './components/AddProfileForm';
import { UserProvider, useUser } from './context/UserContext';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <ProfileManager />
      </UserProvider>
    </div>
  );
}

const ProfileManager = () => {
  const { users, loading } = useUser();
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProfileClick = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
  };

  return (
    <div className="profile-manager">
      <button onClick={handleAddProfileClick}>Add Profile</button>
      {showAddForm && <AddProfileForm closeForm={handleCloseForm} />}
      {loading && <div>Loading...</div>}
      <div className='user-data'>
         {!loading && users.map((user) => <Profile key={user.id} user={user} />)}
      </div>
    </div>
  );
};

export default App;
