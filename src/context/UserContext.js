// src/context/UserContext.js
import React, { createContext, useContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const UserContext = createContext();

const initialState = {
  users: [],
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, { ...action.payload, history: [] }],
      };
    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? {
                ...action.payload,
                history: [...user.history, `Updated on ${new Date().toLocaleString()}`],
              }
            : user
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

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const addUser = (user) =>
    dispatch({ type: 'ADD_USER', payload: { ...user, id: uuidv4() } });

  const updateUser = (user) => dispatch({ type: 'UPDATE_USER', payload: user });

  const deleteUser = (id) => dispatch({ type: 'DELETE_USER', payload: id });

  return (
    <UserContext.Provider value={{ ...state, addUser, updateUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
