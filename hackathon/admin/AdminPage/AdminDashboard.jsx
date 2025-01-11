import React from 'react';
import Dashboard from '../dashboard'
import Navbar from '../AdminSideBar'
const HomePage = () => {
  return (
    <>
      <div className='home-layout'>
        <Navbar />
        <div className='home'>
          <Dashboard />
        </div>
        
      </div>

    </>
  )
}

export default HomePage