import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Table, Card } from "react-bootstrap";

const OfficialDetails = () => {
    const { id } = useParams();
    const location = useLocation();
    const official = location.state?.official; // Official data passed via navigation
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        const db = getDatabase();

        // Fetch posts related to the official
        const postsRef = ref(db, 'UserPosts/');
        onValue(postsRef, (snapshot) => {
            if (snapshot.exists()) {
                const allPosts = Object.values(snapshot.val());
                const relatedPosts = allPosts.filter(post => post.officialConcern === official.Name);
                setPosts(allPosts);
                setFilteredPosts(relatedPosts);
            }
        });
    }, [official]);

    return (
        <div className="official-details">
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>{official.Name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{official.Position}</Card.Subtitle>
                    <Card.Text>
                        <strong>Commendations:</strong>{' '}
                        {filteredPosts.filter(post => post.status === 'commend').length}
                    </Card.Text>
                    <Card.Text>
                        <strong>Reports:</strong>{' '}
                        {filteredPosts.filter(post => post.status === 'report').length}
                    </Card.Text>
                    <Card.Text>
                        <strong>Total Posts:</strong> {filteredPosts.length}
                    </Card.Text>
                </Card.Body>
            </Card>

            <h2>Posts</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPosts.map((post, index) => (
                        <tr key={index}>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td>{post.status}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default OfficialDetails;
