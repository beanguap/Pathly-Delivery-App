import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import MapView from '../../components/MapView/MapView';
import AddressInputBox from '../../components/AddressInputBox/AddressInputBox';
import RouteList from '../../components/RouteList/RouteList';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import InventoryTracker from '../../components/InventoryTracker/InventoryTracker';
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
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const mapRef = useRef(null);

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

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    mapRef.current.startX = e.clientX;
    mapRef.current.startY = e.clientY;
    mapRef.current.startLeft = position.x;
    mapRef.current.startTop = position.y;
  };

  const handleMouseMove = useCallback((e) => {
    if (!dragging) return;
    const dx = e.clientX - mapRef.current.startX;
    const dy = e.clientY - mapRef.current.startY;
    setPosition({
      x: mapRef.current.startLeft + dx,
      y: mapRef.current.startTop + dy
    });
  }, [dragging]);

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, handleMouseMove]);

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
      <div
        className="map-section"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        ref={mapRef}
      >
        <MapView
          center={currentLocation}
          zoom={13}
          markers={memoizedRoutes}
        />
        <div className="drag-handle" onMouseDown={handleMouseDown}></div>
        <div className="resize-handle"></div>
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
