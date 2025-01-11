import React, { useState } from "react";
import Create from "./Create";
import Read from "./Read";
import Edit from "./Edit";

const MainCrud = () => {
  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = (item) => setEditingItem(item);
  const handleCancelEdit = () => setEditingItem(null);

  return (
    <div>
      <h1>CRUD App with Firebase Realtime Database</h1>
      {editingItem ? (
        <Edit item={editingItem} onCancel={handleCancelEdit} />
      ) : (
        <Create />
      )}
      <Read onEdit={handleEdit} />
    </div>
  );
};

export default MainCrud;
