import { useState } from 'react'
import './App.css'
import LoginScreen from './components/LoginScreen'
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom'; // Import React Router components
import Otp from './pages/Otp';
import Dashboard from './pages/Dashboard';
import ConfirmJob from './pages/ConfirmJob';
import Post from './components/Post';
import PostPage from './pages/PostPage';

function App() {
  const [email, setEmail] = useState('');
  
    const [nextClicked, setNextClicked] = useState(false);
    const [errors, setErrors] = useState({});
    const [backClicked, setBackClicked] = useState(false);
    
    const requiredFields = [
      'jobTitle', 'company', 'workType', 'jobLocation', 'jobType', 'description',
      'metaTitle', 'url', 'metaDescription'
    ];
    const [form, setForm] = useState({
      jobTitle: '',
      company: '',
      workType: 'On-site',
      jobLocation: '',
      jobType: 'Full-time',
      description: '',
      metaTitle: '',
      url: '',
      metaDescription: '',
      filterOut: false,
      platform: "",
      customQuestion: "",
      selectedSkills: [],
      screeningCategories: ["Education", "Background Check", "Hybrid Word"], // <-- add this
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };
  
    const validate = () => {
      const newErrors = {};
      console.log('Validating form:', form);
      requiredFields.forEach(field => {
        if (!form[field] || form[field].trim() === '') {
          newErrors[field] = true;
        }
      });
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
  return (
    <>
        <Routes>
          <Route path="/" element={<LoginScreen email={email} setEmail={setEmail}/>} />
          <Route path="/otp" element={<Otp email={email} setEmail={setEmail} />} />
          <Route path="/dashboard" element={<Dashboard backClicked={backClicked} setBackClicked={setBackClicked} nextClicked={nextClicked} setNextClicked={setNextClicked} form={form} setForm={setForm} handleChange={handleChange} errors={errors} setErrors={setErrors} validate={validate}/>} />
          <Route path="/postjob" element={<PostPage setBackClicked={setBackClicked} nextClicked={nextClicked} setNextClicked={setNextClicked} form={form} setForm={setForm} handleChange={handleChange} errors={errors} setErrors={setErrors} validate={validate}/>} />
          <Route path="/confirmjob" element={<ConfirmJob/>} />



          {/* Add more routes as needed */}
        </Routes>
    </>
  )
}

export default App
