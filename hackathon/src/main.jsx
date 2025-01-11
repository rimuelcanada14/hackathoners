import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import SignupPage from './Pages/SignupPage.jsx'
import LandingPage from './Pages/Landing.jsx'
import Creation from '../admin/MainCrud.jsx'
import PostPage from './Components/PostPage.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/creation" element={< Creation />} />
        <Route path="/postpage" element={< PostPage />} />

      </Routes>
    </Router>
  </StrictMode>,
)
