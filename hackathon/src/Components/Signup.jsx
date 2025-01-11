import React, { useState } from 'react';
import {useNavigate, Link} from 'react-router'
import { auth, db } from '../Firebase.jsx';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import '../css/SignupPage.css'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [tagName,setTagName] = useState('')
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user)
      if (user) {
        const currentTimeStamp = Date.now();

        await set(ref(db, 'Users/' + user.uid), {
          email: user.email,
          createdAt: currentTimeStamp,
        });

        setMessage("User successfully created!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setMessage("This email is already registered.");
      } else if (error.code === 'auth/invalid-email') {
        setMessage("The email address is not valid.");
      } else if (error.code === 'auth/weak-password') {
        setMessage("Password must be at least 6 characters.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="signup-bg">
        <img src="./img/waves.png" alt="Background" />
      </div>

      <div className="container-fluid signup-container px-10">
        <div className="signup-content">
          <h1 className="fw-bold signup-title">&nbsp;&nbsp;&nbsp;REGISTER&nbsp;&nbsp;&nbsp;</h1>
          <div className = "signup-form">
          <form onSubmit={handleSignup}>
          <label>Email: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Tag Name: </label>
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              required
            />
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {message && (
              <p className={message.includes("successfully created") ? "signup-success" : "signup-error"}>
                {message}
              </p>
            )}
            <div className="signup-submit">
              <button type='submit'>SIGNUP</button>
            </div>
            
          </form>
        </div>
          <div className="signup-login">
            <p className = "subtext">Already have an account? <Link to="/login" className='signup-log'>Login</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
