import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { getDatabase, ref, onValue } from 'firebase/database';

const OfficialDetail = () => {
    const { id } = useParams(); // Use official ID from the route
    const navigate = useNavigate();
    const [official, setOfficial] = useState(null); // Official details
    const [posts, setPosts] = useState([]); // All posts
    const [filteredPosts, setFilteredPosts] = useState([]); // Posts for the specific official
    const [selection, setSelection] = useState(''); // Selection state for "Reported" or "Commended"

    useEffect(() => {
        const db = getDatabase();

        // Fetch official details
        const officialRef = ref(db, `officials/${id}`);
        onValue(officialRef, (snapshot) => {
            if (snapshot.exists()) {
                setOfficial(snapshot.val());
            }
        });

        // Fetch all posts
        const postsRef = ref(db, 'UserPosts/');
        onValue(postsRef, (snapshot) => {
            if (snapshot.exists()) {
                const allPosts = Object.values(snapshot.val());
                setPosts(allPosts);

                // Filter posts for the specific official
                const relatedPosts = allPosts.filter(post => post.officialConcern === official?.Name);
                setFilteredPosts(relatedPosts);
            }
        });
    }, [id, official?.Name]);

    const handleBack = () => {
        navigate('/admindashboard');
    };

    const handleSelectionChange = (status) => {
        setSelection(status);

        if (status) {
            const filtered = posts.filter(post => post.officialConcern === official?.Name && post.status === status);
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(posts.filter(post => post.officialConcern === official?.Name));
        }
    };

    if (!official) {
        return <p>Loading official details...</p>;
    }

    return (
        <>
            <body className="officials-page">
                <div className='official-layout'>
                    <div className='officials-details'>
                        <h1 className='profile-title'>Profile</h1>
                        <Button className="backbtn" variant="light" onClick={handleBack}>
                            <FaArrowLeft className="me-2" /><span className="h4">Officials</span>
                        </Button>

                        <div className="officials-info">
                            <h5 className="text-uppercase">Name: {official.Name}</h5>
                            <p>Position: {official.Position}</p>
                        </div>

                        <div className="officials-reports">
                            <div className="officials-recommended">
                                Recommended<br />{
                                    posts.filter(post => post.officialConcern === official.Name && post.status === 'commend').length
                                }
                            </div>
                            <div className="officials-recommended">
                                Reported<br />{
                                    posts.filter(post => post.officialConcern === official.Name && post.status === 'report').length
                                }
                            </div>
                            <div className="officials-recommended">
                                Total Reports<br />{
                                    posts.filter(post => post.officialConcern === official.Name).length
                                }
                            </div>
                        </div>

                        <div className="officials-posts">
                            <div className="filter-options">
                                <div
                                    className={`option ${selection === 'report' ? 'selected' : ''}`}
                                    onClick={() => handleSelectionChange('report')}>
                                    Reported
                                </div>
                                <div
                                    className={`option ${selection === 'commend' ? 'selected' : ''}`}
                                    onClick={() => handleSelectionChange('commend')}>
                                    Commended
                                </div>
                                <div
                                    className={`option ${!selection ? 'selected' : ''}`}
                                    onClick={() => handleSelectionChange('')}>
                                    All
                                </div>
                            </div>

                            <div className="posts-container">
                                {filteredPosts.length > 0 ? (
                                    filteredPosts.map((post, index) => (
                                        <div key={index} className="post-card">
                                            <h5>{post.title}</h5>
                                            <p>{post.content}</p>
                                            <small>Status: {post.status}</small>
                                        </div>
                                    ))
                                ) : (
                                    <p>No posts available for this selection.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </>
    );
};

export default OfficialDetail;
