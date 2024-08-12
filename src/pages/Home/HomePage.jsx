import { useState } from 'react';
import { Link } from 'react-router-dom';
import MapView from '../../components/MapView/MapView';
import './homepage.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AddressInputBox from '../../components/AddressInputBox/AddressInput';
import '../components/AddressInputBox/AddressInput.css'
import { Calendar as CalendarIcon } from 'lucide-react';

function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div className="homepage">
      {/* Top bar with time, traffic, and settings */}
      <div className="top-bar">
        <span className="time">11:20 PM</span>
        <span className="traffic">Traffic: Miami, +5 min</span>
        <span className="settings">
          <Link to="/settings">⚙️</Link>
        </span>
      </div>

      {/* Main sections: Calendar, Routes, Notes */}
      <div className="main-sections">
        <div className="section calendar">
          <h2>Calendar</h2>
          <div className="calendar-container">
            <CalendarIcon size={20} className="calendar-icon" />
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              className="calendar-component"
            />
          </div>
        </div>

        <Link to="/route-planning" className="section routes">
          <div>Routes</div>
        </Link>

        <Link to="/notes" className="section notes">
          <div>Notes</div>
        </Link>
      </div>

      {/* Map section with add route button */}
      <div className="map-section">
        <MapView center={[25.7617, -80.1918]} zoom={13} markers={[]} />
        <button className="add-route-btn">+</button>
      </div>
    </div>
  );
}

export default HomePage;
