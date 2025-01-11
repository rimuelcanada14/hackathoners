import React from 'react'
import {db} from '../src/Firebase'
import {useState, useEffect} from 'react'
import {ref, push, onValue} from 'firebase/database'


const Create = () => {

const [Name, setName] = useState("");
const [Position, setPosition] = useState("");
const [editingItem, setEditingItem] = useState(null);

const handleEdit = (item) => setEditingItem(item);
const handleCancelEdit = () => setEditingItem(null);

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

            <button type='submit'>Submit</button>
        </form>
            
        
    </div>


    </>
    
    
    

  )
}

export default Create;