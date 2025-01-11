import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, onValue } from 'firebase/database';
import { Link } from 'react-router-dom';

const DashboardAdmin = () => {
  const [error, setError] = useState(null);
  const [officials, setOfficials] = useState([]); 
  const [posts, setPosts] = useState([]); 
  const db = getDatabase();

  const fetchPosts = () => {
    const postRef = ref(db, 'UserPosts/');
    const unsubscribePosts = onValue(postRef, (snapshot) => {
      if (snapshot.exists()) {
        setPosts(Object.values(snapshot.val())); 
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
        const officialsData = Object.values(snapshot.val());
        setOfficials(officialsData); 
      } else {
        setError('No officials found.');
      }
    });

    return () => unsubscribeOfficials();
  };

  useEffect(() => {
    const cleanupPosts = fetchPosts();
    const cleanupOfficials = fetchOfficials();

    return () => {
      cleanupPosts();
      cleanupOfficials();
    };
  }, []);

  return (
    <div>
      <h1>Dashboard Admin</h1>
      {error && <p>{error}</p>}

      <div>
        <h2>Officials</h2>
        {officials.length > 0 ? (
          officials.map((official, index) => (
            <div key={index} className='text-start pointer-cursor'>
              <p>
                <Link to={`/profileofficer/${official.Name}`}>{official.Name}</Link>
              </p>
              <p>Position: {official.Position}</p>

              <p>
                Number of "Report" posts for {official.Name}: {
                  posts.filter(post => post.officialConcern === official.Name && post.status === 'report').length
                }
              </p>
              <p>
                Number of "Commend" posts for {official.Name}: {
                  posts.filter(post => post.officialConcern === official.Name && post.status === 'commend').length
                }
              </p>
            </div>
          ))
        ) : (
          <p>Loading officials...</p>
        )}
      </div>

      <div>
        <h2>Posts</h2>
        {posts.length > 0 ? (
          <>
            <p>Number of "Report" posts: {posts.filter(post => post.status === 'report').length}</p>
            <p>Number of "Commend" posts: {posts.filter(post => post.status === 'commend').length}</p>
          </>
        ) : (
          <p>Loading posts...</p>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
