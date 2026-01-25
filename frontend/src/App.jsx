import { useState } from 'react';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import LandingPage from './pages/landing.jsx';
import Authentication from './pages/authentication.jsx';
import { AuthProvider } from './contexts/authContext.jsx';
import VideoMeetComponent from './pages/videoMeet.jsx';
import HomeComponent from './pages/home.jsx';

function App() {
  
  return (
    <> 
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/:url" element={<VideoMeetComponent />} />
            <Route path="/home" element={<HomeComponent />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
