import React from 'react'
import Home from '../Components/Home'
import Dashboard from '../../admin/dashboard'
import Navbar from '../Components/Navbar'
import './HomePage.css';
import '../css/Officials.css'
const Officials = () => {
  return (
    <>
      <div className='official-layout'>
        <Navbar />
        <div className='officials'>
          <Dashboard />
        </div>
        
      </div>

    </>
  )
}

export default Officials