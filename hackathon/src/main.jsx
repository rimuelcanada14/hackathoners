import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import SignupPage from './Pages/SignupPage.jsx'
import LandingPage from './Pages/Landing.jsx'
import UserDashboard from './Pages/Officials.jsx'
import Creation from '../admin/MainCrud.jsx'
import OfficialDetail from './Pages/OfficialsInfo.jsx'
import AdminDashboard from '../admin/AdminPage/AdminDashboard.jsx'
import PostPage from './Components/PostPage.jsx'
import AdminOfficialProfilePage from '../admin/AdminPage/AdminOfficialProfilePage.jsx'
import AdminOfficialDetails from '../admin/AdminPage/AdminOfficialDetailsPage.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>

      <Route path="/" element={<LoginPage />} />
      <Route path="/homepage" element={
          <HomePage />
        } />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/landing" element={<LandingPage />} />

        <Route path="/creation" element={< Creation />} />
        <Route path="/postpage" element={< PostPage />} />
        <Route path="/officials" element={< AdminDashboard />} />
        <Route path="/official/:id" element={<OfficialDetail />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminofficialpage/:id" element={<AdminOfficialProfilePage />} />
        <Route path="/Adminofficial/:id" element={<AdminOfficialDetails />} />


      </Routes>
    </Router>
  </StrictMode>,
)
