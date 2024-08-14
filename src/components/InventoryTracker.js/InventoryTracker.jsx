import { useState } from 'react';
import './inventoryTracker.css'; // Assuming you have CSS for InventoryTracker

function InventoryTracker() {
  const [inventory, setInventory] = useState([]);
  const [newInventoryItem, setNewInventoryItem] = useState('');

  const handleInventorySubmit = (e) => {
    e.preventDefault();
    if (newInventoryItem.trim() === '') return;

    setInventory((prevInventory) => {
      const existingItem = prevInventory.find(item => item.name === newInventoryItem.trim());

      if (existingItem) {
        return prevInventory.map(item =>
          item.name === newInventoryItem.trim()
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevInventory, { name: newInventoryItem.trim(), quantity: 1 }];
      }
    });

    setNewInventoryItem('');
  };

  const incrementQuantity = (index) => {
    setInventory((prevInventory) => {
      const updatedInventory = [...prevInventory];
      updatedInventory[index].quantity += 1;
      return updatedInventory;
    });
  };

  const decrementQuantity = (index) => {
    setInventory((prevInventory) => {
      const updatedInventory = [...prevInventory];
      if (updatedInventory[index].quantity > 1) {
        updatedInventory[index].quantity -= 1;
      }
      return updatedInventory;
    });
  };

  return (
    <div className="inventory-tracker">
      <h2>Inventory</h2>
      <form onSubmit={handleInventorySubmit} className="inventory-form">
        <input
          type="text"
          placeholder="Add item to inventory..."
          value={newInventoryItem}
          onChange={(e) => setNewInventoryItem(e.target.value)}
          className="inventory-input"
        />
        <button type="submit" className="inventory-button">Add</button>
      </form>
      <ul className="inventory-list">
        {inventory.map((item, index) => (
          <li key={index} className="inventory-item">
            <span>{item.name} - Quantity:</span>
            <div className="button-group">
              <button onClick={() => decrementQuantity(index)} className="inventory-button decrement">-</button>
              <span className="quantity-display">{item.quantity}</span>
              <button onClick={() => incrementQuantity(index)} className="inventory-button">+</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InventoryTracker;
