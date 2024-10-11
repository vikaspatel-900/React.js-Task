// src/context/UserContext.js

import React, { createContext, useContext, useReducer } from 'react';

// Define the initial state for the user context
const initialState = {
  users: [],
};

// Create a UserContext
const UserContext = createContext();

// User reducer to handle state updates
const userReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) => 
          user.id === action.payload.id ? { ...user, ...action.payload } : user
        ),
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};

// Create a UserProvider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const addUser = (user) => {
    dispatch({ type: 'ADD_USER', payload: user });
  };

  const updateUser = (updatedUser) => {
    // Push the change to history before updating
    const user = state.users.find(u => u.id === updatedUser.id);
    if (user) {
      const historyEntry = {
        date: new Date().toLocaleString(),
        field: 'Profile', // You can adjust this based on the edited field
        oldValue: JSON.stringify({ name: user.name, email: user.email, bio: user.bio }),
        newValue: JSON.stringify({ name: updatedUser.name, email: updatedUser.email, bio: updatedUser.bio }),
      };
      updatedUser.history = [...(user.history || []), historyEntry]; // Append new history entry
    }

    dispatch({ type: 'UPDATE_USER', payload: updatedUser });
  };

  const deleteUser = (id) => {
    dispatch({ type: 'DELETE_USER', payload: id });
  };

  return (
    <UserContext.Provider value={{ users: state.users, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
