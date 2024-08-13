import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [currentLocation, setCurrentLocation] = useState([25.7617, -80.1918]); // Miami coordinates as default

  const toggleInputBox = () => {
    setInputBoxVisible(!isInputBoxVisible);
  };

  const handleAddressSubmit = (addressData) => {
    // Here you would typically use a geocoding service to get lat and lon
    // For this example, we'll use random coordinates near Miami
    const newRoute = {
      ...addressData,
      latitude: 25.7617 + (Math.random() - 0.5) * 0.1,
      longitude: -80.1918 + (Math.random() - 0.5) * 0.1,
    };
    setRoutes(prevRoutes => [...prevRoutes, newRoute]);
    setInputBoxVisible(false);
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