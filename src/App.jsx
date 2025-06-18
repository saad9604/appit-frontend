import { useState } from 'react'
import './App.css'
import LoginScreen from './components/LoginScreen'
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom'; // Import React Router components
import Otp from './pages/Otp';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/otp" element={<Otp/>} />
          <Route path="/dashboard" element={<Dashboard/>} />

          {/* Add more routes as needed */}
        </Routes>
    </>
  )
}

export default App
