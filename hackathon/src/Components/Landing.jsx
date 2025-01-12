import React, { useEffect, useState } from 'react';
import { auth, db } from '../Firebase';
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router';
import Modal from 'react-modal';
import PostPage from './PostPage'; 
import '../css/Modal.css';

const Landing = () => {
  const [userData, setUserData] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postId, setPostId] = useState(null); 
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const userId = auth.currentUser?.uid;
    setLoading(true);
    const userRef = ref(db, 'Users/' + userId);
    const snapshot = await get(userRef);

    if (snapshot.exists) {
      setUserData(snapshot.val());
      setLoading(false);
    }
  };

  const openModal = (id) => {
    setPostId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      <p>{userData.email}</p>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>

      {/* List of posts (for demonstration, post IDs are passed here) */}
      <button onClick={() => openModal('postId1')}>View Post 1</button>
      <button onClick={() => openModal('postId2')}>View Post 2</button>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Post Modal"
        ariaHideApp={false}
        className="post-modal-content" 
        overlayClassName="post-modal-overlay"
      >
        <button onClick={closeModal} className ="modal-close">NameOfOfficial</button>

        {/* Render PostPage inside the modal */}
        {postId && <PostPage postId={postId} />}
        <button onClick={closeModal} className ="modal-close-bot">Close</button>
        
      </Modal>
    </div>
  );
};

export default Landing;
