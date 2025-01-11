import React, { useState } from 'react';
import { auth, db } from '../Firebase.jsx';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [tagName,setTagName] = useState('')
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        const currentTimeStamp = Date.now();

        await set(ref(db, 'Users/' + user.uid), {
          email: user.email,
          createdAt: currentTimeStamp,
        });

        setMessage("User successfully created!");
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
      <div>
        <h1>Signup</h1>
        <div>
          {message && <p>{message}</p>}
          <form onSubmit={handleSignup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="Tagname"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
