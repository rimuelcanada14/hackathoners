import React from 'react'
import Home from '../Components/Home'
import Navbar from '../Components/Navbar'
import './HomePage.css';
const HomePage = () => {
  return (
    <>
      <div className='home-layout'>
        <Navbar />
        <div className='home'>
          <Home />
        </div>
        
      </div>

    </>
  )
}

export default HomePage