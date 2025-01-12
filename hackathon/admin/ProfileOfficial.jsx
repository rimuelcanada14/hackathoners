import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get, onValue } from 'firebase/database';

const ProfileOfficer = () => {
  const [officialPosts, setOfficialPosts] = useState([]);
  const [error, setError] = useState(null);
  const [officialData, setOfficialData] = useState(null); // To store official data (name, position)
  const { officialName } = useParams(); // Get the official name from the URL
  const db = getDatabase();

  // Fetch posts associated with the selected official
  const fetchPostsForOfficial = () => {
    const postRef = ref(db, 'UserPosts/');
    const unsubscribePosts = onValue(postRef, (snapshot) => {
      if (snapshot.exists()) {
        const allPosts = Object.values(snapshot.val());
        const filteredPosts = allPosts.filter(post => post.officialConcern === officialName);
        setOfficialPosts(filteredPosts);
      } else {
        setError('No posts found for this official.');
      }
    });

    return () => unsubscribePosts();
  };

  // Fetch official's data (Name, Position) based on the official name in the URL
  const fetchOfficialData = () => {
    const officialsRef = ref(db, 'officials/');
    const unsubscribeOfficials = onValue(officialsRef, (snapshot) => {
      if (snapshot.exists()) {
        const officialsData = Object.values(snapshot.val());
        const official = officialsData.find(o => o.Name === officialName);
        setOfficialData(official);
      } else {
        setError('Official not found.');
      }
    });

    return () => unsubscribeOfficials();
  };

  useEffect(() => {
    fetchPostsForOfficial();
    fetchOfficialData();
  }, [officialName]);

  // Count the number of "Report" and "Commend" posts
  const countPostsByStatus = (status) => {
    return officialPosts.filter(post => post.status === status).length;
  };

  return (
    <div>
      {officialData ? (
        <>
          <h1>Profile of {officialData.Name}</h1>
          <p>Position: {officialData.Position}</p>
          
          {/* Render the number of "Report" and "Commend" posts */}
          <p>Number of "Report" posts: {countPostsByStatus('report')}</p>
          <p>Number of "Commend" posts: {countPostsByStatus('commend')}</p>

          <div>
            <h2>All Posts for {officialData.Name}</h2>
            {officialPosts.length > 0 ? (
              officialPosts.map((post, index) => (
                <div key={index}>
                  <p><strong>Title:</strong> {post.title}</p>
                  <p><strong>Status:</strong> {post.status}</p>
                  <p><strong>Content:</strong> {post.content}</p>
                </div>
              ))
            ) : (
              <p>No posts for this official yet.</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading official's profile...</p>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default ProfileOfficer;
