import React from 'react'
import {db} from '../src/Firebase'
import {useState, useEffect} from 'react'
import {ref, push} from 'firebase/database'

const OfficialCreation = () => {
const [Name, setName] = useState("");
const [Position, setPosition] = useState("");
const [Image, setImage] = useState(null);

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const Ref = ref(db, 'officials/');
        await push(Ref, {Name, Position});
        setName("");
        setPosition(""); 
        console.log("Successfully Created Official");
    } catch (err) {
        console.error("error in adding official info", err);
    }
};

// useEffect(() => {
//     db.ref('/officials').on('value', (snapshot) => {

//     })
// })


  return (
    <>
    <div>
        <h2>Register New Officials</h2>
        <form onSubmit={handleSubmit}>
            <input 
                type='text'
                placeholder='Manny Pacquiao'
                onChange={(e) => setName(e.target.value)}
                value={Name}
                required
            />
            <input 
                type='text'
                placeholder='Senate'
                onChange={(e) => setPosition(e.target.value)}
                value={Position}
                required
            />

            {/* <input type='file'  /> */}

            <button type='submit'>Submit</button>
        </form>
            
        
    </div>

    <div>
        <h2>Registered Officials</h2>


    </div>
    </>
    
    
    

  )
}

export default OfficialCreation