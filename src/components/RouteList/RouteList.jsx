import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import './RouteList.css';

function RouteList({ routes, currentLocation, onDelete }) {
  const [sortOrder, setSortOrder] = useState('asc');
  const [swipedRouteId, setSwipedRouteId] = useState(null);
  const [initialX, setInitialX] = useState(null);
  const [deletingRouteId, setDeletingRouteId] = useState(null);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    return Math.sqrt(Math.pow(lat2 - lat1, 2) + Math.pow(lon2 - lon1, 2));
  };

  const sortedRoutes = useMemo(() => {
    return [...routes].sort((a, b) => {
      const distanceA = calculateDistance(currentLocation[0], currentLocation[1], a.latitude, a.longitude);
      const distanceB = calculateDistance(currentLocation[0], currentLocation[1], b.latitude, b.longitude);
      return sortOrder === 'asc' ? distanceA - distanceB : distanceB - distanceA;
    });
  }, [routes, currentLocation, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => prevOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleDrag = useCallback((routeId, e, type) => {
    const isTouch = type.startsWith('touch');
    const clientX = isTouch ? e.touches[0].clientX : e.clientX;
    const touchElement = e.currentTarget;

    if (type === 'start') {
      setSwipedRouteId(routeId);
      setInitialX(clientX);
      touchElement.style.transition = '';
    } else if (type === 'move') {
      if (swipedRouteId !== routeId) return;
      const movementX = clientX - initialX;
      if (movementX < 0) {
        touchElement.style.transform = `translateX(${movementX}px)`;
      }
    } else if (type === 'end') {
      const movementX = parseFloat(touchElement.style.transform.slice(11, -3));
      const threshold = -touchElement.offsetWidth / 3;
      touchElement.style.transition = 'transform 0.3s ease';
      if (movementX < threshold) {
        touchElement.style.transform = 'translateX(-80px)';
        touchElement.classList.add('swiped');
      } else {
        touchElement.style.transform = 'translateX(0)';
        touchElement.classList.remove('swiped');
      }
      setSwipedRouteId(null);
      setInitialX(null);
    }
  }, [initialX, swipedRouteId]);

  const handleDelete = useCallback((routeId) => {
    setDeletingRouteId(routeId);
    setTimeout(() => {
      onDelete(routeId);
      setDeletingRouteId(null);
    }, 1000); // Adjust this timeout to match your CSS animation duration
  }, [onDelete]);

  return (
    <div className="route-list-container">
      <h3>Routes (Closest to Farthest)</h3>
      <button 
        onClick={toggleSortOrder} 
        className="sort-button"
        aria-label={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
      >
        Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
      </button>
      <div className="route-list">
        {sortedRoutes.map((route) => (
          <div
            key={route.id}
            className={`route-item-wrapper ${deletingRouteId === route.id ? 'deleting' : ''}`}
            onTouchStart={(e) => handleDrag(route.id, e, 'start')}
            onTouchMove={(e) => handleDrag(route.id, e, 'move')}
            onTouchEnd={(e) => handleDrag(route.id, e, 'end')}
            onMouseDown={(e) => handleDrag(route.id, e, 'start')}
            onMouseMove={(e) => handleDrag(route.id, e, 'move')}
            onMouseUp={(e) => handleDrag(route.id, e, 'end')}
          >
            <div className="route-item">
              <p>{route.name}</p>
              <p>{route.street}</p>
              <p>{`${route.city}, ${route.state} ${route.zipCode}`}</p>
              <p>{route.country}</p>
            </div>
            <div className="delete-button" onClick={() => handleDelete(route.id)}>Delete</div>
          </div>
        ))}
      </div>
    </div>
  );
}

RouteList.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  })).isRequired,
  currentLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RouteList;