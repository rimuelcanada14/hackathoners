import React, { useState  } from 'react'
import {useNavigate} from 'react-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth,db} from '../Firebase'
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
    <div>
      <h1>Login</h1>
      <div>
      {message && <p>{message}</p>}
      <form onSubmit={handleLogin}>
          <input type="email" value={email} placeholder='Email' onChange={(e) =>setEmail(e.target.value)} />
          <input type="password" value={password} placeholder='Passowrd' onChange={(e) =>setPassword(e.target.value)} />
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login