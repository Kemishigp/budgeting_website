// import React, { createContext, useState, useContext } from 'react';
// import axiosClient from '../api/axiosClient';

// const AuthContext = createContext();

// let accessToken = null;

// export const getAccessToken = () => accessToken;

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = async (email, password) => {
//     const res = await axiosClient.post('/auth/login', { email, password });
//     accessToken = res.data.token;
//     setUser({ email }); // optional: add id if backend returns it
//   };

//   const signup = async (email, password) => {
//     const res = await axiosClient.post('/auth/signup', { email, password });
//     accessToken = res.data.token;
//     setUser({ email });
//   };

//   const logout = () => {
//     accessToken = null;
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


import { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
