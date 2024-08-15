import { useState } from 'react';
import PropTypes from 'prop-types';
import './addressInputBox.css';

const AddressInputBox = ({ isVisible, onClose, onAddressSubmit }) => {
  const [addressData, setAddressData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    fullAddress: '',
  });

  if (!isVisible) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    if (name === 'fullAddress') {
      parseAddress(value);
    }
  };

  const handleClear = (e) => {
    const { name } = e.target;
    setAddressData(prevData => ({
      ...prevData,
      [name]: '',
    }));
  };

  const parseAddress = (fullAddress) => {
    // Basic example - this needs to be adapted for more accurate parsing
    const parts = fullAddress.split(',');
    if (parts.length < 4) return;

    const streetCityState = parts[0].trim();
    const cityStateZip = parts[1].trim();
    const country = parts[2].trim();
    const zipCode = cityStateZip.split(' ')[1]?.trim() || '';

    setAddressData({
      ...addressData,
      street: streetCityState,
      city: cityStateZip.split(' ')[0]?.trim() || '',
      state: cityStateZip.split(' ')[1]?.trim() || '',
      zipCode: zipCode,
      country: country,
      fullAddress: fullAddress,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{5}(-\d{4})?$/.test(addressData.zipCode)) {
      alert("Please enter a valid ZIP/Postal Code.");
      return;
    }
    onAddressSubmit({
      name: addressData.name,
      street: addressData.street,
      city: addressData.city,
      state: addressData.state,
      zipCode: addressData.zipCode,
      country: addressData.country,
    });
    setAddressData({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      fullAddress: '',
    });
  };

  return (
    <div className="address-input-box" role="dialog" aria-labelledby="addressInputForm">
      <div className="box-content">
        <button className="close-btn" onClick={onClose} aria-label="Close">Close</button>
        <form onSubmit={handleSubmit} id="addressInputForm">
          {['fullAddress', 'name', 'street', 'city', 'state', 'zipCode', 'country'].map(field => (
            <div key={field} className="input-container">
              <input
                type="text"
                name={field}
                value={addressData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                aria-label={field.charAt(0).toUpperCase() + field.slice(1)}
              />
              <button
                type="button"
                className="clear-btn"
                name={field}
                onClick={handleClear}
                aria-label={`Clear ${field}`}
              >
                ×
              </button>
            </div>
          ))}
          <button type="submit" aria-label="Submit Address">Submit</button>
        </form>
      </div>
    </div>
  );
};

AddressInputBox.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddressSubmit: PropTypes.func.isRequired,
};

export default AddressInputBox;
