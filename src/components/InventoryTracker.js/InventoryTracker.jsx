import { useState } from 'react';
import './InventoryTracker.css';

function InventoryTracker() {
  const [inventory, setInventory] = useState({});
  const [itemTitle, setItemTitle] = useState('');

  const addItem = () => {
    if (itemTitle.trim()) {
      setInventory(prev => ({ ...prev, [itemTitle]: 0 }));
      setItemTitle('');
    }
  };

  const incrementItem = (item) => {
    setInventory(prev => ({ ...prev, [item]: prev[item] + 1 }));
  };

  const decrementItem = (item) => {
    setInventory(prev => ({
      ...prev,
      [item]: prev[item] > 0 ? prev[item] - 1 : 0
    }));
  };

  return (
    <div className="inventory-tracker">
      <h2>Inventory Tracker</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Item Title"
          value={itemTitle}
          onChange={(e) => setItemTitle(e.target.value)}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul className="inventory-list">
        {Object.keys(inventory).map(item => (
          <li key={item}>
            <span>{item}: {inventory[item]}</span>
            <button onClick={() => incrementItem(item)}>+</button>
            <button onClick={() => decrementItem(item)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryTracker;
