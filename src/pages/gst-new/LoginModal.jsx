import React, { useState } from 'react';
import "./Modal.css"

const LoginModal = ({ isOpen, onClose, onSubmit }) => {
  // Initialize states for input fields
  const [gstin, setGstin] = useState('');
  const [username, setUsername] = useState('');

  // If the modal is not open, return null to hide the component
  if (!isOpen) return null;

  // Handler for submitting the form
  const handleSubmit = () => {
    // Pass the values to the onSubmit function
    onSubmit({ gstin, username });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Login to your GSTIN account</h2>
        <div className="form-group">
          <label htmlFor="gstin">GSTIN</label>
          <input
            type="text"
            id="gstin"
            placeholder="GSTIN"
            value={gstin}
            onChange={(e) => setGstin(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
          <button onClick={onClose} className="close-button ml-2">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
