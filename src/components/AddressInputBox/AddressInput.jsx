import { useState } from 'react';
import PropTypes from 'prop-types';
import './addressInput.css';

const AddressInputBox = ({ isVisible, onClose, onAddressSubmit }) => {
  const [addressData, setAddressData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  if (!isVisible) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddressSubmit(addressData);
    setAddressData({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    });
  };

  return (
    <div className="address-input-box">
      <div className="box-content">
        <button className="close-btn" onClick={onClose}>Close</button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={addressData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <input
            type="text"
            name="street"
            value={addressData.street}
            onChange={handleChange}
            placeholder="Street Address"
            required
          />
          <input
            type="text"
            name="city"
            value={addressData.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
          <input
            type="text"
            name="state"
            value={addressData.state}
            onChange={handleChange}
            placeholder="State/Province"
            required
          />
          <input
            type="text"
            name="zipCode"
            value={addressData.zipCode}
            onChange={handleChange}
            placeholder="ZIP/Postal Code"
            required
          />
          <input
            type="text"
            name="country"
            value={addressData.country}
            onChange={handleChange}
            placeholder="Country"
            required
          />
          <button type="submit">Submit</button>
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