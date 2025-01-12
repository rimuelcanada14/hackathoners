import React, {useState, useEffect} from 'react'
import Navbar from '../Components/Navbar'
import { useParams } from 'react-router-dom';
import './../css/OfficialsInfo.css';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { getDatabase, ref, get, onValue } from 'firebase/database';
import user from './../assets/profileavatar.png'


const OfficialDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const db = getDatabase();
    const [official, setOfficial] = useState(null); // State to store the official's details
    const [posts, setPosts] = useState([]); // State to store the posts related to the official


    useEffect(() => {
      // Fetch the specific official's data based on the ID
      const fetchOfficialData = () => {
        const officialRef = ref(db, `officials/${id}`); // Reference to the specific official
  
        onValue(officialRef, (snapshot) => {
          if (snapshot.exists()) {
            setOfficial(snapshot.val()); // Set the official's data in state
          } else {
            console.error('No official found with this ID.');
          }
        });
      };

      const fetchUserPosts = () => {
        const postsRef = ref(db, 'UserPosts/');
        onValue(postsRef, (snapshot) => {
          if (snapshot.exists()) {
            const allPosts = Object.values(snapshot.val());
            const relatedPosts = allPosts.filter(post => post.officialConcern === official?.Name);
            setPosts(relatedPosts);
          }
        });
      };
  
      fetchOfficialData();
      fetchUserPosts();
    }, [id, db, official?.Name]);

    

    const handleBack = () => {
        navigate('/officials');
    };
    const [selection, setSelection] = useState('commended');

  const handleSelectionChange = (e) => {
    setSelection(e.target.value);
  };

  // Filter posts for "reported" and "commended" statuses
  const reportedPosts = posts.filter(post => post.status === 'report');
  const commendedPosts = posts.filter(post => post.status === 'commend');
  const totalPosts = reportedPosts.length + commendedPosts.length;

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
                  {official ? (
                    <div className='official-header'>
                      <h5 className="text-uppercase">{official.Name}</h5>
                      <p>{official.Position}</p>
                      {/* Render more official details here as needed */}
                    </div>
                  ) : (
                    <p>Loading official's details...</p>
                  )}
                </div>

                <div className="officials-reports">
                    <div className="officials-recommended">
                      <div className='first'>
                        <h5>COMMENDED</h5>
                        <p>{commendedPosts.length}</p>
                      </div>
                        
                    </div>
                    <div className="officials-recommended">
                      <div className='second'>
                        <h5>REPORTED</h5>
                        <p>{reportedPosts.length}</p>
                      </div>
                    </div>
                    <div className="officials-recommended">
                      <div className='third'>
                        <h5>TOTAL</h5>
                        <p>{totalPosts}</p>
                      </div>
                    </div>
                </div>

                <div className="officials-posts">
                  <div className='tabs-selection'>
                    <div className={`option option-reported ${selection === 'commended' ? 'selected' : ''}`} onClick={() => setSelection('commended')}
                      style={{ color: selection === 'commended' ? '#FDBC39' : 'gray' }}
                    >
                        Commended
                    </div>
                    <div className={`option ${selection === 'reported' ? 'selected' : ''}`} onClick={() => setSelection('reported')}
                      style={{ color: selection === 'reported' ? '#FDBC39' : 'gray' }}
                    >
                        Reported
                    </div>
                  </div>
                    

                    <div>
                        {selection === 'reported'}
                        {selection === 'commended'}
                    </div>
                </div>

                <div>
                {selection === 'reported' && (
                  <div className='reported'>
                    {posts.filter(post => post.status === 'report').length > 0 ? (
                      posts.filter(post => post.status === 'report').map(post => (
                        <div key={post.id} className="post-item">
                          <div className='user-comment-header'>
                            <img src={user} className='user-comment'></img>
                            <p className='anonymous'>Anonymous</p>
                          </div>
                          <h5>{post.title}</h5>
                          <p>{post.content}</p>
                        </div>
                      ))
                    ) : (
                      <p className='no-post'>No post available</p> // Message when no posts are available
                    )}
                  </div>
                )}
                {selection === 'commended' && (
                  <div className='commended'>
                    {posts.filter(post => post.status === 'commend').length > 0 ? (
                      posts.filter(post => post.status === 'commend').map(post => (
                        <div key={post.id} className="post-item">
                          <div className='user-comment-header'>
                            <img src={user} className='user-comment'></img>
                            <p className='anonymous'>Anonymous</p>
                          </div>
                          <h5>{post.title}</h5>
                          <p>{post.content}</p>
                        </div>
                      ))
                    ) : (
                      <p>No post available</p> // Message when no posts are available
                    )}
                  </div>
                )}
              </div>
                

              </div>
            </div>
          </body>
        </>
      );
      
}

export default OfficialDetail