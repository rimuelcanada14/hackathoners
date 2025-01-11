import React, { useState  } from 'react'
import {useNavigate, Link} from 'react-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth,db} from '../Firebase'
import '../css/LoginPage.css'

const Login = () => {
  const [email,setEmail] =useState('')
  const [password,setPassword] = useState('')
  const [message,setMessage] = useState('')
  const navigate = useNavigate();
    const handleLogin = async(e) =>{
    e.preventDefault()
    try{
      await signInWithEmailAndPassword(auth,email,password)
      navigate("/landing")
      console.log("login successfully")
    }catch(err){
      console.log(err)
      if (err.code === 'auth/invalid-credential') {
        setMessage("invalid Email or Password")

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
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="./img/logo.png" alt="Background" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <div className = "login-form">
            {message && <p>{message}</p>}
              <form onSubmit={handleLogin}>
                <label>Email: </label>
                <input id="email" type="email" value={email} onChange={(e) =>setEmail(e.target.value)} />
                <label>Password: </label>
                <input id="password" type="password" value={password} onChange={(e) =>setPassword(e.target.value)} />
                <div className="login-submit">
                  <button type='submit'>LOGIN</button>
                </div>
              </form>
          </div>
          <div className="login-register">
            <p className = "subtext">Don't have an account? <Link to="/signup" className='login-reg'>Register</Link></p>
          </div>
        </div>
      </div>
    </body>
    
    </>
    
  )
}

export default Login