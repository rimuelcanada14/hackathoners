import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../Firebase'
import { ref, get } from 'firebase/database'
import '../css/LoginPage.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    // Reset previous message on a new login attempt
    setMessage('')

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      // Get a reference to the user's data in the Realtime Database
      const userRef = ref(db, 'Users/' + userCredential.user.uid)

      // Fetch the user data from Realtime Database
      const snapshot = await get(userRef)

      if (snapshot.exists()) {
        const userData = snapshot.val()
        const userType = userData.typeOf // Assuming 'typeOf' is a field in the data

        if (userType === 'user') {
          navigate('/homepage')  // Redirect to User Home Page
        } else if (userType === 'admin') {
          navigate('/officials')  // Redirect to Admin Home Page
        } else {
          setMessage('Invalid user type.')
        }
      } else {
        setMessage('User data not found.')
      }
    } catch (err) {
      console.error(err)
      if (err.code === 'auth/invalid-credential') {
        setMessage('Invalid Email or Password')
      } else {
        setMessage('An error occurred, please try again later.')
      }
    }
  }

  return (
    <>
      <body className="login-page">
        <div className="login-bg">
          <img src="./img/waves.png" alt="Background" />
        </div>
        <div className="container-fluid login-container">
          <div className="login-content">
            <div className="login-logo">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="./img/logo.png" alt="Logo" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>

            <div className="login-form">
              {message && <p className="error-message" role="alert">{message}</p>}
              <form onSubmit={handleLogin}>
                <label htmlFor="email">Email: </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-describedby="emailHelp"
                />
                <label htmlFor="password">Password: </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
      </body>
    </>
  )
}

export default Login
