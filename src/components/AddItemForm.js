import { useState } from "react";
import Button from "./Button";

function AddItemForm({ onAddNewItem }) {
  const [newItem, setNewItem] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!newItem) return;

    const id = crypto.randomUUID();

    const new_item = {
      name: newItem,
      purchased: false,
      quantity,
      id,
    };

    onAddNewItem(new_item);

    setNewItem("");
    setQuantity(1);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new item"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 15 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <Button>Add</Button>
    </form>
  );
}

export default AddItemForm;
