import React from "react";
import {useState, useEffect} from 'react'
import {db} from '../src/Firebase'
import {ref, update} from 'firebase/database';

const Edit = ({item, onCancel}) => {
    const [Name, setName] = useState(item.Name);
    const [Position, setPosition] = useState(item.Position);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const Ref = ref(db, 'officials');
            await update(Ref, {Name, Position});
            console.log("Info Successfully Updated");
            onCancel();

        } catch (err) {
            console.log("Error Updating Info", err);
            console.log("Error in updating info");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={Name}
                required/>
                <label>Position: </label>
                <input 
                type="text"
                onChange={(e) => setPosition(e.target.value)}
                value={Position}
                required/>
                <button type="submit">Submit</button>
                <button onClick={onCancel}>Cancel</button>
            </form>
        </div>    
    )


}

export default Edit;