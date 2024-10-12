// src/App.js
import React from 'react';
import { UserProvider } from './context/UserContext';
import UsersList from './components/UsersList';
import './App.css'

const App = () => (
  <UserProvider>
    <UsersList />
  </UserProvider>
);

export default App;
