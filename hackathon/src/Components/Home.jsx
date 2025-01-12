import React, { useEffect, useState } from "react";
import { getDatabase, ref, get,onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import '../css/Home.css'
import '../css/Officials.css';
import user from '../assets/profileavatar.png';

const Home = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [officials, setOfficials] = useState([]);
  const [posts, setPosts] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const db = getDatabase();

  const fetchPost = async () => {
    const postRef = ref(db, "UserPosts/");
    const postSnapShot = await get(postRef);

    if (postSnapShot.exists()) {
      setPosts(Object.values(postSnapShot.val()));
      console.log(postSnapShot.val());
    } else {
      setError("No posts found.");
    }
  };

  // Fetch and listen to officials in real-time
    const fetchOfficials = () => {
      const officialsRef = ref(db, 'officials/');
      
      const unsubscribeOfficials = onValue(officialsRef, (snapshot) => {
        if (snapshot.exists()) {
          const officialsData = [];
          snapshot.forEach(childSnapshot => {
            const data = childSnapshot.val();
            officialsData.push({ id: childSnapshot.key, ...data });
          });
          setOfficials(officialsData); // Update officials with the latest data
        } else {
          setError('No officials found.');
        }
      });
    
      // Return the unsubscribe function to be called in the cleanup
      return unsubscribeOfficials;
    };

  useEffect(() => {
    fetchOfficials();
    fetchPost();
  }, []);

  // Filter officials based on search query
  const filteredOfficials = officials.filter((official) =>
    official.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOfficialClick = (id, name) => {
    navigate(`/official/${id}`)
  }

  return (
    <div className="container mt-4 mx-auto flex justify-center">
      {/* Officials Section */}
      <div className="mb-4">
        <h3 className="home-title">List of Officials</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Search Input */}
        <div className="mb-3">
          <input
            type="text"
            id = "searchBar"
            className="form-control"
            style={{ width: "100%" }} // Set a fixed width
            placeholder="Search for an official by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="row">
          {filteredOfficials.length > 0 ? (
            filteredOfficials.map((official, index) => (
              <div className="officials-box" key={official.id} onClick={() => handleOfficialClick(official.id, official.Name)}>
                <div className="card">
                  
                  <div className="officiales-grid">
                    <img
                                        src={user}
                                        className="official-avatar"
                                        alt="Official Avatar"
                      />
                  <p className="official-name">{official.Name}</p>
                  <p className="official-position">{official.Position}</p>
                    <div>
                      {Array.isArray(posts) && posts.length > 0 ? (
                        <div className="countes-container">
                        <div>
                          <p className="total-count-text">{
                            posts.filter(
                              (post) =>
                                post.officialConcern === official.Name &&
                                post.status === 'report'
                            ).length
                            }
                          </p>
                          <p className="reported-title">Reported</p>
                        </div>

                        <div>
                          <p className="total-count-text">
                          {
                          posts.filter(
                            (post) =>
                              post.officialConcern === official.Name &&
                              post.status === 'commend'
                          ).length
                        }
                          </p>
                          <p className="commended-title">Commended</p>
                        </div>
                        

                        </div>
                      ) : (
                        <p>Loading posts...</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No matching officials found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
