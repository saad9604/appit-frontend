import { useState } from 'react'
import './App.css'
import LoginScreen from './components/LoginScreen'
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom'; // Import React Router components
import Otp from './pages/Otp';
import Dashboard from './pages/Dashboard';
import PostJob from './pages/PostJob';
import ConfirmJob from './pages/ConfirmJob';

function App() {
  const [email, setEmail] = useState('');
  return (
    <>
        <Routes>
          <Route path="/" element={<LoginScreen email={email} setEmail={setEmail}/>} />
          <Route path="/otp" element={<Otp email={email} setEmail={setEmail} />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/postjob" element={<PostJob/>} />
          <Route path="/confirmjob" element={<ConfirmJob/>} />



          {/* Add more routes as needed */}
        </Routes>
    </>
  )
}

export default App
