import 'src/components/AddressInputBox/AddressInput.css'


const AddressInputBox = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="address-input-box">
      <div className="box-content">
        <input type="text" placeholder="Enter Address" />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddressInputBox;
