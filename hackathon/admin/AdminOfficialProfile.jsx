import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Modal, Form } from "react-bootstrap";
import { getDatabase, ref, onValue, set, remove } from 'firebase/database';
import './AdminOfficialPage.css';

const AdminOfficialsPage = () => {
    const navigate = useNavigate();
    const [officials, setOfficials] = useState([]); // List of all officials
    const [selectedOfficial, setSelectedOfficial] = useState(null); // Official to edit
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [form, setForm] = useState({ Name: '', Position: '' }); // Form for adding/editing
    const [posts, setPosts] = useState([]); // All posts
    const [search, setSearch] = useState(''); // Search input

    useEffect(() => {
        const db = getDatabase();

        // Fetch officials
        const officialsRef = ref(db, 'officials/');
        onValue(officialsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setOfficials(Object.entries(data).map(([id, value]) => ({ id, ...value })));
            }
        });

        // Fetch posts
        const postsRef = ref(db, 'UserPosts/');
        onValue(postsRef, (snapshot) => {
            if (snapshot.exists()) {
                setPosts(Object.values(snapshot.val()));
            }
        });
    }, []);

    const handleShowModal = (official) => {
        setSelectedOfficial(official);
        setForm(official ? { Name: official.Name, Position: official.Position } : { Name: '', Position: '' });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOfficial(null);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSave = () => {
        const db = getDatabase();
        const officialRef = selectedOfficial
            ? ref(db, `officials/${selectedOfficial.id}`)
            : ref(db, `officials/${Date.now()}`);

        set(officialRef, form)
            .then(() => {
                handleCloseModal();
            })
            .catch((error) => {
                console.error("Error saving official:", error);
            });
    };

    const handleDelete = (id) => {
        const db = getDatabase();
        const officialRef = ref(db, `officials/${id}`);

        remove(officialRef)
            .then(() => {
                console.log("Official deleted");
            })
            .catch((error) => {
                console.error("Error deleting official:", error);
            });
    };

    const filteredOfficials = officials.filter(
        (official) => official.Name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="admin-officials-page">
            <div className="content">
                <h1 className='admin-title'>Admin Officials Management</h1>

                <div className="header">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="search-bar"
                        id='searchBar'
                    />
                </div>
                <Button className= "add-btn"variant="primary" onClick={() => handleShowModal(null)}>Add Official</Button>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className = "table-border">Name</th>
                            <th>Position</th>
                            <th>Commendations</th>
                            <th>Reports</th>
                            <th>Total Reports</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
    {filteredOfficials.map((official) => {
        const commendations = posts.filter(
            (post) => post.officialConcern === official.Name && post.status === 'commend'
        ).length;

        const reports = posts.filter(
            (post) => post.officialConcern === official.Name && post.status === 'report'
        ).length;

        return (
            <tr key={official.id}>
                <td>{official.Name}</td>
                <td>{official.Position}</td>
                <td>{commendations}</td>
                <td>{reports}</td>
                <td>{commendations + reports}</td>
                <td>
                    <Button variant="info" onClick={() => handleShowModal(official)}>Edit</Button>{' '}
                    <Button variant="danger" onClick={() => handleDelete(official.id)}>Delete</Button>
                </td>
            </tr>
        );
    })}
</tbody>

                </Table>
            </div>

            {/* Modal for Adding/Editing */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedOfficial ? "Edit Official" : "Add Official"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="Name"
                                value={form.Name}
                                onChange={handleFormChange}
                                placeholder="Enter official name"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPosition">
                            <Form.Label>Position</Form.Label>
                            <Form.Control
                                type="text"
                                name="Position"
                                value={form.Position}
                                onChange={handleFormChange}
                                placeholder="Enter position"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="primary" onClick={handleSave}>
                        {selectedOfficial ? "Save Changes" : "Add Official"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminOfficialsPage;
