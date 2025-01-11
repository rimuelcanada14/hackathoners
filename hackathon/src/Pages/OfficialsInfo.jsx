import React, {useState} from 'react'
import Navbar from '../Components/Navbar'
import { useParams } from 'react-router-dom';
import './../css/OfficialsInfo.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";


const OfficialDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const handleBack = () => {
        navigate('/officials');
    };
    const [selection, setSelection] = useState('');

  const handleSelectionChange = (e) => {
    setSelection(e.target.value);
  };

    return (
        <>
          <body className="officials-page">
            <div className='official-layout'>
              <Navbar />
              <div className='officials-details'>
                <h1 className='profile-title'>Profile</h1>
                <Button className="backbtn" variant="light" onClick={handleBack}>
                  <FaArrowLeft className="me-2" /><span className="h4">Officials</span>
                </Button>
      
                <div className="officials-info">
                  <h5 className="text-uppercase">NAME</h5>
                </div>

                <div className="officials-reports">
                    <div className="officials-recommended">
                        Recommended<br/>123
                    </div>
                    <div className="officials-recommended">
                        Reported <br/> 123
                    </div>
                    <div className="officials-recommended">
                        Total Reports <br/> 123
                    </div>
                </div>

                <div className="officials-posts">
                    <div className={`option ${selection === 'reported' ? 'selected' : ''}`} onClick={() => setSelection('reported')}>
                        Reported
                    </div>
                    <div className={`option ${selection === 'commended' ? 'selected' : ''}`} onClick={() => setSelection('commended')}>
                        Commended
                    </div>

                    <div>
                        {selection === 'reported' && <p>This is the reports</p>}
                        {selection === 'commended' && <p>This is the commends</p>}
                    </div>
                </div>
                

              </div>
            </div>
          </body>
        </>
      );
      
}

export default OfficialDetail