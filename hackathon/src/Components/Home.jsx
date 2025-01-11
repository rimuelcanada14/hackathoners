import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";

const Home = () => {
  const [error, setError] = useState(null);
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

  const fetchOfficials = async () => {
    try {
      const officialsRef = ref(db, "officials/");
      const snapshot = await get(officialsRef);
      if (snapshot.exists()) {
        const officialsData = Object.values(snapshot.val());
        console.log(officialsData);
        setOfficials(officialsData);
      } else {
        setError("No officials found.");
      }
    } catch (err) {
      setError("Failed to fetch officials.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOfficials();
    fetchPost();
  }, []);

  // Filter officials based on search query
  const filteredOfficials = officials.filter((official) =>
    official.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <div className="container mt-4 mx-auto flex justify-center">

      {/* Officials Section */}
      <div className="mb-4">
        <h3>List of Officials</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Search Input */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            style={{ width: '100%' }} // Set a fixed width
            placeholder="Search for an official by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="row">
          {filteredOfficials.length > 0 ? (
            filteredOfficials.map((official, index) => (
              <div className="col-md-6 mb-3" key={index}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{official.Name}</h5>
                    <p className="card-text">
                      <strong>Position:</strong> {official.Position}
                    </p>
                    <div>
                      {Array.isArray(posts) && posts.length > 0 ? (
                        <div className="mt-3">
                          <p className="mb-2">
                            <strong>Number of "Report" posts:</strong>{" "}
                            {posts.filter(
                              (post) => post.status === "report"
                            ).length}
                          </p>
                          <p>
                            <strong>Number of "Commend" posts:</strong>{" "}
                            {posts.filter(
                              (post) => post.status === "commend"
                            ).length}
                          </p>
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
