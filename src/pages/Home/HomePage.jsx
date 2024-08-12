import { useState } from 'react';
import { Link } from 'react-router-dom';
import MapView from '../../components/MapView/MapView';
import AddressInputBox from '../../components/AddressInputBox/AddressInput';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './homepage.css';

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isInputBoxVisible, setInputBoxVisible] = useState(false);

  const toggleInputBox = () => {
    setInputBoxVisible(!isInputBoxVisible);
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
        <Link to="/route-planning" className="section routes">
          <div>Routes</div>
        </Link>
        <Link to="/notes" className="section notes">
          <div>Notes</div>
        </Link>
      </div>
      <div className="map-section">
        <MapView center={[25.7617, -80.1918]} zoom={13} markers={[]} />
        <button className="add-route-btn" onClick={toggleInputBox}>+</button>
        {isInputBoxVisible && (
          <AddressInputBox
            isVisible={isInputBoxVisible}
            onClose={() => setInputBoxVisible(false)}
          />
        )}
      </div>
    </div>
  );
}

export default HomePage;
