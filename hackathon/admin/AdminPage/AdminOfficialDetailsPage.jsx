import React from 'react';
import AdminOfficialDetails from '../AdminOfficialDetails'
import Navbar from '../AdminSideBar'
const HomePage = () => {
  return (
    <>
      <div className='home-layout'>
        <Navbar />
        <div className='home'>
          <AdminOfficialDetails />
        </div>
        
      </div>

    </>
  )
}

export default HomePage