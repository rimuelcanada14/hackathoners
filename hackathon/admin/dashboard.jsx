import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import Col from 'react-bootstrap/Col';
import user from './../src/assets/profileavatar.png';
import './../src/css/Officials.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';


const DashboardAdmin = () => {
  const [error, setError] = useState(null);
  const [officials, setOfficials] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showCharts, setShowCharts] = useState(false);
  const db = getDatabase();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch posts data
    const postRef = ref(db, 'UserPosts/');
    const unsubscribePosts = onValue(postRef, (snapshot) => {
      if (snapshot.exists()) {
        setPosts(Object.values(snapshot.val()));
      } else {
        setError('No posts found.');
      }
    });

    // Fetch officials data
    const officialsRef = ref(db, 'officials/');
    const unsubscribeOfficials = onValue(officialsRef, (snapshot) => {
      if (snapshot.exists()) {
        const officialsData = [];
        snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          officialsData.push({ id: childSnapshot.key, ...data });
        });
        setOfficials(officialsData);
      } else {
        setError('No officials found.');
      }
    });

    // Cleanup listeners
    return () => {
      unsubscribePosts();
      unsubscribeOfficials();
    };
  }, []);

  const handleOfficialClick = (id, name) => {
    navigate(`/Adminofficial/${id}`, { state: { name } });
  };

  const reportPostsCount = posts.filter((post) => post.status === 'report').length;
  const commendPostsCount = posts.filter((post) => post.status === 'commend').length;

  const barData = [
    { name: 'Report Posts', count: reportPostsCount },
    { name: 'Commend Posts', count: commendPostsCount },
  ];

  const officialPostCounts = officials.map((official) => {
    const reportCount = posts.filter(
      (post) => post.officialConcern === official.Name && post.status === 'report'
    ).length;
    const commendCount = posts.filter(
      (post) => post.officialConcern === official.Name && post.status === 'commend'
    ).length;
    return { name: official.Name, report: reportCount, commend: commendCount };
  });

  return (
    <div className="dashboard container-fluid">
      <Col className="header-container">
        <h1>Dashboard Admin</h1>
        <button
          className="toggle-button"
          onClick={() => setShowCharts((prev) => !prev)}
        >
          {showCharts ? 'Show List of Officials' : 'Show Charts'}
        </button>
      </Col>

      {error && <p className="error-message">{error}</p>}

      {showCharts ? (
        <div className="charts-container">
          <div className="section">
            <h2>Posts Overview</h2>
            {barData.length > 0 ? (
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p>No post data available.</p>
            )}
          </div>

          <div className="section">
            <h2>Officials Overview</h2>
            {officialPostCounts.length > 0 ? (
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
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
              </div>
            ) : (
              <p>No official data available.</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2>List of Officials</h2>
          <div className="officials-grid">
            {officials.length > 0 ? (
              officials.map((official) => (
                <div
                  className="officials-box"
                  key={official.id}
                  onClick={() => handleOfficialClick(official.id, official.Name)}
                >
                  <img
                    src={user}
                    className="official-avatar"
                    alt="Official Avatar"
                  />
                  <p className="official-name">{official.Name}</p>
                  <p className="official-position">{official.Position}</p>
                  <div className="counts-container">
                    <div>
                      <p className="total-count-text">
                        {
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
                </div>
              ))
            ) : (
              <p>Loading officials...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAdmin;
