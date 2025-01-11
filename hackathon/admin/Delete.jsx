import React from "react";
import {useState, useEffect} from 'react'
import {db} from '../src/Firebase'
import {ref, remove} from 'firebase/database';

const Delete = ({ id }) => {
    const handleDelete = async () => {
        try {
            const itemRef = ref(db, `officials/${id}`);
            await remove(itemRef);
            console.log("Item deleted successfully!");
          } catch (err) {
            console.error("Error deleting item:", err);
            console.log("Failed to delete item!");
          }
    }

    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Delete;