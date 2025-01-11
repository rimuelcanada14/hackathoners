import React, { useEffect, useState  } from 'react'
import {auth,db} from '../Firebase'
import { ref, get } from 'firebase/database';
import {useNavigate} from 'react-router'

const Landing = () => {
  const [userData,setUserData]=useState('')
  const [loading, setLoading] = useState(false)
  const navigate =useNavigate()
  const fetchUserData =async() =>{
    const userId = auth.currentUser?.uid;
    setLoading(true)
    const useRef = ref(db, 'Users/' +userId);
    const snapshot =await get(useRef)
    
    if(snapshot.exists){
      setUserData(snapshot.val())
      setLoading(false)
      console.log(snapshot.val())
    }

  }    
    useEffect(() =>{
      fetchUserData()
    },[])
    const handleLogout = async () =>{
      try{
        await auth.signOut()
        navigate('/login')
        console.log("User Successfully Logout")
      }catch (error) {
        console.log(error )
        console.log("User Failed to signout")
      }

    }
  return (
    <div>
      {loading && <p>Loading tang ina</p>}
      <p>{userData.email}</p>
      <button type='button' onClick={() =>handleLogout()}>Logout</button>
    </div>
  )
}

export default Landing