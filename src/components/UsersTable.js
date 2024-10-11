// src/components/UsersTable.js

import React from 'react';
import { useUser } from '../context/UserContext';
import Profile from './Profile';

const UsersTable = () => {
  const { users } = useUser();

  return (
    <div className="users-table">
      <h2>User Profiles</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Bio</th>
            <th>Profile Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.bio}</td>
              <td>
                <img src={user.profilePicture || 'https://via.placeholder.com/50'} alt="Profile" />
              </td>
              <td>
                <Profile user={user} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
