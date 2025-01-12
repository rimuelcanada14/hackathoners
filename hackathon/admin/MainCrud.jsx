import React, { useState } from "react";
import Create from "./Create";
import Read from "./Read";
import Edit from "./Edit";
import {ref, remove} from 'firebase/database';
import {db} from '../src/Firebase';

const MainCrud = () => {
  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = (item) => setEditingItem(item);
  const handleCancelEdit = () => setEditingItem(null);
  
  const handleDelete = async (id) => {
    try {
      const itemRef = ref(db, `officials/${id}`);
      await remove(itemRef);
      console.log("Item deleted successfully!");
      console.log("Deleting item with ID:", id); 

    } catch (error) {
      console.error("Error deleting item:", error);
      console.log("Failed to delete item!");
    }
  };
  return (
    <div>
      <h1>Offical Creation Portal</h1>
      {editingItem ? (
        <Edit item={editingItem} onCancel={handleCancelEdit} />
      ) : (
        <Create />
      )}
      <Read onEdit={handleEdit} onDelete={handleDelete}/>
    </div>
  );
};

export default MainCrud;
