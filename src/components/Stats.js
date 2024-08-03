function Stats({ items }) {
  if (!items.length) {
    return (
      <p className="stats">
        <em>Let's go Shopping 🤩, start adding needed items on your list 🛒</em>
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

export default Stats;
