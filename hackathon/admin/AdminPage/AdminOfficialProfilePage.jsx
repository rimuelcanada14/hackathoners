import React from 'react';
import AdminProfile from '../AdminOfficialProfile'
import Navbar from '../AdminSideBar'
const HomePage = () => {
  return (
    <>
      <div className='home-layout'>
        <Navbar />
        <div className='home'>
          <AdminProfile />
        </div>
        
      </div>

    </>
  )
}

export default HomePage