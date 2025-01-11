import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'  // Use react-router-dom
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../Firebase'
import { ref, get } from 'firebase/database'  // Import Realtime Database methods
import '../css/LoginPage.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      // Get a reference to the user's data in the Realtime Database
      const userRef = ref(db, 'Users/' + userCredential.user.uid)  // Assuming 'users' is your Realtime Database path

      // Fetch the user data from Realtime Database
      const snapshot = await get(userRef)

      // Check if the user document exists
      if (snapshot.exists()) {
        const userData = snapshot.val()  // Get the user data from the snapshot
        const userType = userData.typeOf  // Assuming you have a 'typeOf' field in your data

        // Navigate based on the user type
        if (userType === 'user') {
          navigate('/homepage')  // Redirect to User Home Page
        } else if (userType === 'admin') {
          navigate('/admindashboard')  // Redirect to Admin Home Page
        } else {
          setMessage('Invalid user type.')
        }
      } else {
        setMessage('User data not found.')
      }
    } catch (err) {
      console.log(err)
      if (err.code === 'auth/invalid-credential') {
        setMessage('Invalid Email or Password')
      } else {
        setMessage('An error occurred, please try again later.')
      }
    }
  }

  return (
    <>
      <div className="login-bg">
        <img src="./img/waves.png" alt="Background" />
      </div>
      <div className="container-fluid login-container">
        <div className="login-content">
          <div className="login-logo">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="./img/logo.png" alt="Background" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <div className="login-form">
            {message && <p>{message}</p>}
            <form onSubmit={handleLogin}>
              <label>Email: </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password: </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="login-submit">
                <button type="submit">LOGIN</button>
              </div>
            </form>
          </div>
          <div className="login-register">
            <p className="subtext">
              Don't have an account? <Link to="/signup" className="login-reg">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
