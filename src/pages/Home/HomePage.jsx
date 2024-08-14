import { useState } from 'react';
import axios from 'axios';
import MapView from '../../components/MapView/MapView';
import AddressInputBox from '../../components/AddressInputBox/AddressInputBox';
import RouteList from '../../components/RouteList/RouteList';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './homepage.css';

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isInputBoxVisible, setInputBoxVisible] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);  // New state for submission status
  const [currentLocation] = useState([25.7617, -80.1918]); // Miami coordinates as default
  const [inventory, setInventory] = useState([]);  // State for inventory tracking
  const [newInventoryItem, setNewInventoryItem] = useState('');  // State for new inventory item input

  const toggleInputBox = () => {
    setInputBoxVisible(!isInputBoxVisible);
  };

  const handleAddressSubmit = async (addressData) => {
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);  // Set submitting status to true
    try {
      const { street, city, state, zipCode, country } = addressData;
      const query = `${street}, ${city}, ${state} ${zipCode}, ${country}`;
      const encodedQuery = encodeURIComponent(query);
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}`,
        {
          headers: {
            'User-Agent': 'YourAppName/1.0' // Replace with your app name and version
          }
        }
      );

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const newRoute = {
          ...addressData,
          latitude: parseFloat(lat),
          longitude: parseFloat(lon),
        };
        setRoutes(prevRoutes => [...prevRoutes, newRoute]);
        setInputBoxVisible(false);
      } else {
        alert("Couldn't find coordinates for the given address. Please try again.");
      }
    } catch (error) {
      console.error("Error geocoding address:", error);
      alert("An error occurred while processing your request. Please try again.");
    } finally {
      setIsSubmitting(false);  // Reset submission status
    }
  };

  const handleInventorySubmit = (e) => {
    e.preventDefault();
    if (newInventoryItem.trim() === '') return;  // Prevent adding empty items

    setInventory((prevInventory) => {
      const existingItem = prevInventory.find(item => item.name === newInventoryItem.trim());

      if (existingItem) {
        // If item already exists, increment the quantity
        return prevInventory.map(item =>
          item.name === newInventoryItem.trim()
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If item does not exist, add it with quantity 1
        return [...prevInventory, { name: newInventoryItem.trim(), quantity: 1 }];
      }
    });

    setNewInventoryItem('');  // Reset input field
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
    <div className="homepage">
      <div className="top-bar">
        <span className="time">11:20 PM</span>
        <span className="traffic">Traffic: Miami, +5 min</span>
        <span className="settings">⚙️</span>
      </div>
      <div className="main-sections">
        <div className="section calendar">
          <h2 className="text-lg font-semibold mb-2">Calendar</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
          />
        </div>
        <div className="section routes">
          <RouteList routes={routes} currentLocation={currentLocation} />
        </div>
        <div className="section notes">
          <h2>Inventory</h2>
          <form onSubmit={handleInventorySubmit}>
            <input
              type="text"
              placeholder="Add item to inventory..."
              value={newInventoryItem}
              onChange={(e) => setNewInventoryItem(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
          <ul>
            {inventory.map((item, index) => (
              <li key={index}>
                {item.name} - Quantity: {item.quantity}
                <button onClick={() => incrementQuantity(index)}>+</button>
                <button onClick={() => decrementQuantity(index)}>-</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="map-section">
        <MapView
          center={currentLocation}
          zoom={13}
          markers={routes.map(route => ({
            position: [route.latitude, route.longitude],
            popup: `${route.name}, ${route.street}, ${route.city}, ${route.state} ${route.zipCode}`
          }))}
        />
        <button className="add-route-btn" onClick={toggleInputBox} disabled={isSubmitting}>+</button>
        {isInputBoxVisible && (
          <AddressInputBox
            isVisible={isInputBoxVisible}
            onClose={() => setInputBoxVisible(false)}
            onAddressSubmit={handleAddressSubmit}
            isSubmitting={isSubmitting} // Pass submission status to AddressInputBox
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
