import Button from "./Button";

function ShoppingItem({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" onChange={() => onToggleItem(item.id)} />
      <span
        style={{ textDecoration: item.purchased ? "line-through" : "none" }}
      >
        {item.quantity} {item.name}
      </span>
      <Button onClick={() => onDeleteItem(item.id)}>❌</Button>
    </li>
  );
}

export default ShoppingItem;
