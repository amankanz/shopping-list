import { useState } from "react";
import AddItemForm from "./AddItemForm";
import Button from "./Button";
import ShoppingItem from "./ShoppingItem";
import Stats from "./Stats";

const initials_items = [
  { name: "Milk", purchased: false, quantity: 2, id: 233445 },
  { name: "Bread", purchased: false, quantity: 1, id: 233000 },
  { name: "Eggs", purchased: false, quantity: 5, id: 222224 },
  { name: "Butter", purchased: false, quantity: 1, id: 12389 },
  { name: "Cheese", purchased: false, quantity: 2, id: 18467 },
];

function ShoppingList() {
  const [items, setItems] = useState(initials_items);
  const [sortBy, setSortBy] = useState("input");

  function handleAddNewItem(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      )
    );
  }

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));

  if (sortBy === "purchased")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.purchased) - Number(b.purchased));

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <section>
      <span>
        <AddItemForm onAddNewItem={handleAddNewItem} />
      </span>
      <ul>
        {sortedItems.map((item) => (
          <ShoppingItem
            key={item.id}
            item={item}
            onDeleteItem={handleDeleteItem}
            onToggleItem={handleToggleItem}
          />
        ))}
      </ul>

      <span>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="purchased">Sort by purchased status</option>
        </select>
      </span>
      <Button onClick={handleClearList}>Clear List 🚮</Button>

      <Stats items={items} />
    </section>
  );
}

export default ShoppingList;
