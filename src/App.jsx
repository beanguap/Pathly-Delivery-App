import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Panel from './pages/Panel/Panel';
import RoutePlanning from './pages/RoutePlanning';
import ScheduleCreation from './pages/ScheduleCreation';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Panel />} />
          <Route path="/route-planning" element={<RoutePlanning />} />
          <Route path="/schedule-creation" element={<ScheduleCreation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;