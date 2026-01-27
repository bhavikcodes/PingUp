import axios from 'axios';
import React, { useContext,createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import httpStatus from "http-status";

export const AuthContext = createContext({});
const client = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1/users`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const AuthProvider = ({ children }) => {
  const authContext = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const router = useNavigate();
   
  const handleRegister = async (name, username, password) => {
    if(!name || !username || !password) {
      return "All fields are required.";
    }
    try {
      let request = await client.post('/register', { name:name, username:username, password:password });
      if(request.status === httpStatus.CREATED) {
        return request.data.message;
      }
    } catch (err) {
      console.error("Register error details:", err.response || err.message || err);
      throw err;
    } 
  };

  const handleLogin = async (username, password) => {
    try{
      let request = await client.post('/login', { username:username, password:password });
      if(request.status === httpStatus.OK) {
        localStorage.setItem('token', request.data.token);
        router('/home');
        return "Login successful.";
      }
    }
    catch (err) {
      throw err;
    }
  };

  const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
        } catch
         (err) {
            throw err;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }

    const data = {
        userData, setUserData, addToUserHistory, getHistoryOfUser, handleRegister, handleLogin
    };

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
}