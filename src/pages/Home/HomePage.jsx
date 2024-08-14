import { useState, useMemo } from 'react';
import axios from 'axios';
import MapView from '../../components/MapView/MapView';
import AddressInputBox from '../../components/AddressInputBox/AddressInputBox';
import RouteList from '../../components/RouteList/RouteList';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import InventoryTracker from '../../components/InventoryTracker.js/InventoryTracker';
import './homepage.css';

const API_ENDPOINT = 'https://nominatim.openstreetmap.org/search';
const API_HEADERS = {
  'User-Agent': 'YourAppName/1.0'
};

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isInputBoxVisible, setInputBoxVisible] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentLocation] = useState([25.7617, -80.1918]);

  const toggleInputBox = () => {
    setInputBoxVisible(!isInputBoxVisible);
  };

  const handleAddressSubmit = async (addressData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { street, city, state, zipCode, country } = addressData;
      const query = `${street}, ${city}, ${state} ${zipCode}, ${country}`;
      const encodedQuery = encodeURIComponent(query);
      const response = await axios.get(
        `${API_ENDPOINT}?format=json&q=${encodedQuery}`,
        { headers: API_HEADERS }
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
      if (error.response) {
        alert(`Error: ${error.response.data.message || 'Server responded with an error'}`);
      } else if (error.request) {
        alert('No response from server. Please check your connection.');
      } else {
        alert('An error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Memoize the routes for performance
  const memoizedRoutes = useMemo(() => routes.map(route => ({
    position: [route.latitude, route.longitude],
    popup: `${route.name}, ${route.street}, ${route.city}, ${route.state} ${route.zipCode}`
  })), [routes]);

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
        <div className="section inventory-tracker">
          <InventoryTracker />
        </div>
      </div>
      <div className="map-section">
        <MapView
          center={currentLocation}
          zoom={13}
          markers={memoizedRoutes}
        />
        <button 
          className="add-route-btn" 
          onClick={toggleInputBox} 
          disabled={isSubmitting} 
          aria-label="Add new route"
        >
          +
        </button>
        {isInputBoxVisible && (
          <AddressInputBox
            isVisible={isInputBoxVisible}
            onClose={() => setInputBoxVisible(false)}
            onAddressSubmit={handleAddressSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;