import  { useState } from 'react';
import AddressInputBox from './AddressInputBox';

const RouteManager = () => {
  const [isInputBoxVisible, setIsInputBoxVisible] = useState(false);
  const [routes, setRoutes] = useState([]);

  const handleAddRoute = (newRoute) => {
    setRoutes(prevRoutes => [...prevRoutes, newRoute]);
    setIsInputBoxVisible(false);
  };

  const handleCloseInputBox = () => {
    setIsInputBoxVisible(false);
  };

  return (
    <div className="p-4">
      <button 
        onClick={() => setIsInputBoxVisible(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Route
      </button>
      
      <AddressInputBox
        isVisible={isInputBoxVisible}
        onClose={handleCloseInputBox}
        onAddressSubmit={handleAddRoute}
      />
      
      <div className="routes-section mt-4">
        <h3 className="text-xl font-bold mb-2">Routes List</h3>
        {routes.length === 0 ? (
          <p>No routes added yet.</p>
        ) : (
          <ul className="list-disc pl-5">
            {routes.map((route, index) => (
              <li key={index} className="mb-2">
                {route.name}, {route.street}, {route.city}, {route.state}, {route.zipCode}, {route.country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RouteManager;