import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/Home/HomePage';
import RoutePlanning from './pages/RoutePlanning'
import ScheduleCreation from './pages/ScheduleCreation'


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/route-planning" element={<RoutePlanning />} />
          <Route path="/schedule-creation" element={<ScheduleCreation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
