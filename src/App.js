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
  // const items = initials_items;
  const [items, setItems] = useState(initials_items);

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

  function handleClearList() {
    setItems([]);
  }

  return (
    <section>
      <span>
        <AddItemForm onAddNewItem={handleAddNewItem} />
      </span>
      <ul>
        {items.map((item) => (
          <ShoppingItem
            key={item.id}
            item={item}
            onDeleteItem={handleDeleteItem}
            onToggleItem={handleToggleItem}
          />
        ))}
      </ul>

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
        📝 You have ${num_items} tasks on your list, and you already completed ${purchased_items}(${percentage}%)`}
      </em>
    </footer>
  );
}
