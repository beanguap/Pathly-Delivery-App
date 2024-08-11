import React from 'react';
import { Link } from 'react-router-dom';
import MapView from '../../components/MapView/MapView';
import './pages/Home/homepage.css'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'lucide-react';

function HomePage() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

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
          <div className="flex items-center">
            <Calendar className="mr-2" size={20} />
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="p-2 border rounded"
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
      <div className="map-section">
        <MapView center={[25.7617, -80.1918]} zoom={13} markers={[]} />
        <button className="add-route-btn">+</button>
      </div>
    </div>
  );
}

export default HomePage;