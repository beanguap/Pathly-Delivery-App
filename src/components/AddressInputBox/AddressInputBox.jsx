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
    if (!/^\d{5}(-\d{4})?$/.test(addressData.zipCode)) {
      alert("Please enter a valid ZIP/Postal Code.");
      return;
    }
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
    <div className="address-input-box" role="dialog" aria-labelledby="addressInputForm">
      <div className="box-content">
        <button className="close-btn" onClick={onClose} aria-label="Close">Close</button>
        <form onSubmit={handleSubmit} id="addressInputForm">
          <input
            type="text"
            name="name"
            value={addressData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            aria-label="Full Name"
          />
          <input
            type="text"
            name="street"
            value={addressData.street}
            onChange={handleChange}
            placeholder="Street Address"
            required
            aria-label="Street Address"
          />
          <input
            type="text"
            name="city"
            value={addressData.city}
            onChange={handleChange}
            placeholder="City"
            required
            aria-label="City"
          />
          <input
            type="text"
            name="state"
            value={addressData.state}
            onChange={handleChange}
            placeholder="State/Province"
            required
            aria-label="State/Province"
          />
          <input
            type="text"
            name="zipCode"
            value={addressData.zipCode}
            onChange={handleChange}
            placeholder="ZIP/Postal Code"
            required
            aria-label="ZIP/Postal Code"
          />
          <input
            type="text"
            name="country"
            value={addressData.country}
            onChange={handleChange}
            placeholder="Country"
            required
            aria-label="Country"
          />
          <button type="submit" aria-label="Submit Address">Submit</button>
        </form>
      </div>
    </div>
  );
}

AddressInputBox.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddressSubmit: PropTypes.func.isRequired,
};

export default AddressInputBox;