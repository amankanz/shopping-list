import { useState } from "react";

const initials_items = [
  { name: "Milk", purchased: false, id: 233445 },
  { name: "Bread", purchased: false, id: 233000 },
  { name: "Eggs", purchased: false, id: 222224 },
  { name: "Butter", purchased: false, id: 12389 },
  { name: "Cheese", purchased: false, id: 18467 },
];

function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

export default function App() {
  return (
    <main className="App">
      <h1>Shopping List</h1>
      <ShoppingList />
    </main>
  );
}

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

function ShoppingItem({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" onChange={() => onToggleItem(item.id)} />
      <span
        style={{ textDecoration: item.purchased ? "line-through" : "none" }}
      >
        {item.name}
      </span>
      <Button onClick={() => onDeleteItem(item.id)}>❌</Button>
    </li>
  );
}

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
      id,
    };

    onAddNewItem(new_item);

    setNewItem("");
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

function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>
          {" "}
          Let's go Shopping 🤩, start adding needed items on your list 🛒
        </em>
      </p>
    );
  }

  const num_items = items.length;
  const purchased_items = items.filter((item) => item.purchased).length;
  const percentage = Math.round((purchased_items / num_items) * 100);
  return (
    <footer>
      <em>
        {percentage === 100
          ? `You got everything done! Felicitations! 🥳 `
          : `
        📝 You have ${num_items} items on your list, and you already purchased ${purchased_items}(${percentage}%)`}
      </em>
    </footer>
  );
}
