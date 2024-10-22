import { useState } from 'react';
import HomePage from '../Home/HomePage';
import InventoryPage from '../InventoryPage';
import './Panel.css';

const pages = [
  { component: HomePage, name: 'Home' },
  { component: InventoryPage, name: 'Inventory' },
];

function Panel() {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const goToNextPage = () => {
    setCurrentPageIndex((prevIndex) => (prevIndex + 1) % pages.length);
  };

  const goToPreviousPage = () => {
    setCurrentPageIndex((prevIndex) => (prevIndex - 1 + pages.length) % pages.length);
  };

  const CurrentPage = pages[currentPageIndex].component;

  return (
    <div className="panel">
      <button className="arrow left" onClick={goToPreviousPage}>&lt;</button>
      <div className="page-container">
        <CurrentPage />
      </div>
      <button className="arrow right" onClick={goToNextPage}>&gt;</button>
      <div className="indicators">
        {pages.map((page, index) => (
          <span
            key={index}
            className={`indicator ${index === currentPageIndex ? 'active' : ''}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Panel;