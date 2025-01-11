import React from "react";
import {useState, useEffect} from 'react'
import {db} from '../src/Firebase'
import {ref, onValue, remove} from 'firebase/database';


const Read = ({ onEdit, onDelete }) => {
    const [items, setItems] = useState([]);
    
    useEffect(() => {
      const Ref = ref(db, "officials/");
      const uns = onValue(Ref, (snapshot) => {
        const data = snapshot.val();
        const itemsList = data 
          ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          : [];
        setItems(itemsList);
      });
  
      return () => uns();
    }, []);
  
    return (
      <div>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.Name}</strong>: {item.Position}
              <button onClick={() => onEdit(item)}>Edit</button>
              <button onClick={() => onDelete(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Read;
  