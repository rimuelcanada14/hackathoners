import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get, onValue } from 'firebase/database';

const DashboardAdmin = () => {
  const [error, setError] = useState(null);
  const [officials, setOfficials] = useState([]); // Initialize with an empty array
  const [posts, setPosts] = useState([]); // Initialize with an empty array (instead of null)
  const db = getDatabase();

  // Fetch and listen to posts in real-time
  const fetchPosts = () => {
    const postRef = ref(db, 'UserPosts/');
    
    // Using onValue to listen to changes in the "UserPosts" node
    const unsubscribePosts = onValue(postRef, (snapshot) => {
      if (snapshot.exists()) {
        setPosts(Object.values(snapshot.val())); // Update posts with the latest data
        console.log(snapshot.val());
      } else {
        setError('No posts found.');
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribePosts();
  };

  // Fetch and listen to officials in real-time
  const fetchOfficials = () => {
    const officialsRef = ref(db, 'officials/');
    
    // Using onValue to listen to changes in the "officials" node
    const unsubscribeOfficials = onValue(officialsRef, (snapshot) => {
      if (snapshot.exists()) {
        const officialsData = Object.values(snapshot.val());
        setOfficials(officialsData); // Update officials with the latest data
        console.log(officialsData);
      } else {
        setError('No officials found.');
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribeOfficials();
  };

  useEffect(() => {
    // Start listening for updates on posts and officials
    const cleanupPosts = fetchPosts();
    const cleanupOfficials = fetchOfficials();

    // Cleanup listeners when component unmounts
    return () => {
      cleanupPosts();
      cleanupOfficials();
    };
  }, []);

  return (
    <div>
      <h1>Dashboard Admin</h1>
      {error && <p>{error}</p>}

      {/* Render officials data */}
      <div>
        <h2>Officials</h2>
        {officials.length > 0 ? (
          officials.map((official, index) => (
            <div key={index}>
              <p>Name: {official.Name}</p>
              <p>Position: {official.Position}</p>

              {/* Count the posts for the specific official */}
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

      {/* Render posts data */}
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
