import { useState, useEffect } from 'react'
import './App.css'
import LoginScreen from './components/LoginScreen'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import React Router components
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
  const [selectedSection, setSelectedSection] = useState('');

  const screeningQuestionsMap = {
    "Education": "Have you completed the following level of education degree?",
    "Background Check": "Are you willing to undergo a background check?",
    "Hybrid Word": "Are you comfortable working in a hybrid environment?",
    "Work Experience": "How many years of relevant work experience do you have?",
    "Expertise with skills": "Do you have expertise with the required skills for this role?",
    "Remote Collaboration": "Are you proficient in remote collaboration tools and practices?",
    "Career Development": "Are you looking for opportunities for career development and growth?",
    "Project Management": "Do you have experience with project management methodologies?",
    "Communication Skills": "Do you possess excellent written and verbal communication skills?",
    "Technical Proficiency": "Are you proficient in the technical tools and software required for this position?",
    "Time Management": "How do you prioritize tasks and manage your time effectively?",
    "Team Leadership": "Do you have experience in leading a team?",
    "Adaptability": "How adaptable are you to changing work environments and priorities?",
  };

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
    screeningCategories: [],
  });

  useEffect(() => {
    if (!form.screeningCategories || form.screeningCategories.length === 0) {
      setForm(prevForm => ({
        ...prevForm,
        screeningCategories: [
          { category: "Education", question: screeningQuestionsMap["Education"], idealAnswer: "Yes", mustHave: false },
          { category: "Background Check", question: screeningQuestionsMap["Background Check"], idealAnswer: "Yes", mustHave: false },
          { category: "Hybrid Word", question: screeningQuestionsMap["Hybrid Word"], idealAnswer: "Yes", mustHave: false },
        ],
      }));
    }
  }, []);

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
        <Route path="/" element={<LoginScreen email={email} setEmail={setEmail} />} />
        <Route path="/otp" element={<Otp email={email} setEmail={setEmail} />} />
        <Route path="/dashboard" element={<Dashboard selectedSection={selectedSection} setSelectedSection={setSelectedSection} screeningQuestionsMap={screeningQuestionsMap} backClicked={backClicked} setBackClicked={setBackClicked} nextClicked={nextClicked} setNextClicked={setNextClicked} form={form} setForm={setForm} handleChange={handleChange} errors={errors} setErrors={setErrors} validate={validate} />} />
        <Route path="/postjob" element={<PostPage setBackClicked={setBackClicked} nextClicked={nextClicked} setNextClicked={setNextClicked} form={form} setForm={setForm} handleChange={handleChange} errors={errors} setErrors={setErrors} validate={validate} />} />
        <Route path="/confirmjob" element={<ConfirmJob setSelectedSection={setSelectedSection} screeningQuestionsMap={screeningQuestionsMap} setNextClicked={setNextClicked} setBackClicked={setBackClicked} backClicked={backClicked} form={form} setForm={setForm} handleChange={handleChange} errors={errors} setErrors={setErrors} validate={validate} />} />
      </Routes>
    </>
  )
}

export default App
