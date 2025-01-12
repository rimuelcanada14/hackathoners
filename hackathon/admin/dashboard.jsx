import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getDatabase, ref, get, onValue } from 'firebase/database';

import Col from 'react-bootstrap/Col';
import user from './../src/assets/profileavatar.png'
import './../src/css/Officials.css'


const DashboardAdmin = () => {
  const [error, setError] = useState(null);
  const [officials, setOfficials] = useState([]); 
  const [posts, setPosts] = useState([]); 
  const db = getDatabase();
  const navigate = useNavigate();


  const fetchPosts = () => {
    const postRef = ref(db, 'UserPosts/');

    // Using onValue to listen to changes in the "UserPosts" node
    const unsubscribePosts = onValue(postRef, (snapshot) => {
      if (snapshot.exists()) {
        setPosts(Object.values(snapshot.val())); // Update posts with the latest data
      } else {
        setError('No posts found.');
      }
    });

    return () => unsubscribePosts();
  };

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
    const cleanupPosts = fetchPosts();
    const cleanupOfficials = fetchOfficials();

    return () => {
      cleanupPosts();
      cleanupOfficials();
    };
  }, []);

  const handleOfficialClick = (id, name) => {
    navigate(`/Adminofficial/${id}`, { state: { name } });
};

  return (
    <div className='dashboard container-fluid'>
      <Col className='header-container'>
          <h1>List of Officials</h1>
      </Col> 

      {error && <p>{error}</p>}

      <div>
        <div className='officials-grid'>
        {officials.length > 0 ? (

  officials.map((official, index) => (
    <div className="officials-box" key={official.id} onClick={() => handleOfficialClick(official.id, official.Name)}>
    <img src={user} className="official-avatar" alt="Official Avatar" />
    <p className="official-name">{official.Name}</p>
    <p className="official-position">{official.Position}</p>
    <div className="counts-container">
        <div>
            <p className="total-count-text">
                {posts.filter(post => post.officialConcern === official.Name && post.status === 'report').length}
            </p>
            <p className="reported-title">Reported</p>
        </div>
        <div>
            <p className="total-count-text">
                {posts.filter(post => post.officialConcern === official.Name && post.status === 'commend').length}
            </p>
            <p className="commended-title">Commended</p>
        </div>
    </div>
</div>
  ))
) : (
  <p>Loading officials...</p>
          )}
        </div>
        
      </div>

      {/* Render posts data */}
      {/* <div>
        <h2>Posts</h2>

  // Bar chart data for posts
  const reportPostsCount = posts.filter(post => post.status === 'report').length;
  const commendPostsCount = posts.filter(post => post.status === 'commend').length;
  const barData = [
    { name: 'Report Posts', count: reportPostsCount },
    { name: 'Commend Posts', count: commendPostsCount },
  ];

  // Bar chart data for officials and post counts
  const officialPostCounts = officials.map((official) => {
    const reportCount = posts.filter(post => post.officialConcern === official.Name && post.status === 'report').length;
    const commendCount = posts.filter(post => post.officialConcern === official.Name && post.status === 'commend').length;
    return { name: official.Name, report: reportCount, commend: commendCount };
  });

  return (
    <div className="dashboard">
      <h1 className="title">Dashboard Admin</h1>

      {error && <p className="error-message">{error}</p>}

      <div className="section">
        <h2 className="section-title">Officials</h2>
        {officials.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={officialPostCounts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="report" fill="#8884d8" />
              <Bar dataKey="commend" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>

        ) : (
          <p>Loading officials...</p>
        )}
      </div>

      <div>
        <h2>Posts</h2>

      <div className="section">
        <h2 className="section-title">Posts Overview</h2>

        {posts.length > 0 ? (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <p><strong>Total "Report" Posts:</strong> {reportPostsCount}</p>
            <p><strong>Total "Commend" Posts:</strong> {commendPostsCount}</p>
          </>
        ) : (
          <p>Loading posts...</p>
        )}
      </div> */}
    </div>
  );
};

export default DashboardAdmin;
