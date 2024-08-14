import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [currentLocation] = useState([25.7617, -80.1918]); // Miami coordinates as default

  const toggleInputBox = () => {
    setInputBoxVisible(!isInputBoxVisible);
  };

  const handleAddressSubmit = async (addressData) => {
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
    }
  };

  return (
    <div className="homepage">
      <div className="top-bar">
        <span className="time">11:20 PM</span>
        <span className="traffic">Traffic: Miami, +5 min</span>
        <span className="settings">
          <Link to="/settings">⚙️</Link>
        </span>
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
        <Link to="/notes" className="section notes">
          <div>Notes</div>
        </Link>
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
        <button className="add-route-btn" onClick={toggleInputBox}>+</button>
        {isInputBoxVisible && (
          <AddressInputBox
            isVisible={isInputBoxVisible}
            onClose={() => setInputBoxVisible(false)}
            onAddressSubmit={handleAddressSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;