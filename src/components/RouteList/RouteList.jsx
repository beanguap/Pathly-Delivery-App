import { useState } from 'react';
import PropTypes from 'prop-types';
import './routelist.css'

function RouteList({ routes, currentLocation }) {
  const [sortOrder, setSortOrder] = useState('asc');

  // Function to calculate distance (you may want to use a more accurate method)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
  };

  // Sort routes by distance from current location
  const sortedRoutes = [...routes].sort((a, b) => {
    const distanceA = calculateDistance(currentLocation[0], currentLocation[1], a.latitude, a.longitude);
    const distanceB = calculateDistance(currentLocation[0], currentLocation[1], b.latitude, b.longitude);
    return sortOrder === 'asc' ? distanceA - distanceB : distanceB - distanceA;
  });

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="route-list-container">
      <h3>Routes (Closest to Farthest)</h3>
      <button onClick={toggleSortOrder} className="sort-button">
        Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
      </button>
      <div className="route-list">
        {sortedRoutes.map((route, index) => (
          <div key={index} className="route-item">
            <p>{route.name}</p>
            <p>{route.street}</p>
            <p>{`${route.city}, ${route.state} ${route.zipCode}`}</p>
            <p>{route.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

RouteList.propTypes = {
  routes: PropTypes.array.isRequired,
  currentLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default RouteList;