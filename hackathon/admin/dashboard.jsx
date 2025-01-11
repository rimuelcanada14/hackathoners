import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from "firebase/database";

const DashboardAdmin = () => {
  const [error, setError] = useState(null);
  const [officials, setOfficials] = useState([]); // Initialize with an empty array
  const [posts, setPosts] = useState(null); // Initialize with null
  const db = getDatabase();

  const fetchPost = async () => {
    const postRef = ref(db, 'UserPosts/');
    const postSnapShot = await get(postRef);

    if (postSnapShot.exists()) {
      setPosts(Object.values(postSnapShot.val()));
      console.log(postSnapShot.val());
    } else {
      setError("No posts found.");
    }
  };

  const fetchOfficials = async () => {
    try {
      const officialsRef = ref(db, 'officials/'); // Reference to the "officials" node
      const snapshot = await get(officialsRef); // Get the data
      if (snapshot.exists()) {
        const officialsData = Object.values(snapshot.val());
        console.log(officialsData);
        setOfficials(officialsData); // Update state with official data
      } else {
        setError('No officials found.');
      }
    } catch (err) {
      setError('Failed to fetch officials.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOfficials();
    fetchPost();
  }, []);

  return (
    <div>
      <h1>Dashboard Admin</h1>
      {error && <p>{error}</p>}

      {/* Render officials data */}
      {officials.length > 0 ? (
        officials.map((official, index) => (
          <div key={index}>
            <p>Name: {official.Name}</p>
            <p>Position: {official.Position}</p>
            
          </div>
        ))
      ) : (
        <p>Loading officials...</p>
      )}

<div>
      {error && <p>{error}</p>}

      {/* Check if posts is an array before applying .filter() */}
      {Array.isArray(posts) && posts.length > 0 ? (
        <>
          <p>Number of "Report" posts: {posts.filter(post => post.status === "report").length}</p>
          <p>Number of "Commend" posts: {posts.filter(post => post.status === "commend").length}</p>
        </>
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
    </div>
  );
};

export default DashboardAdmin;
