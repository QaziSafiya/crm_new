import React from 'react';
import "./Modal.css"

const LoginModal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Login to your GSTIN account</h2>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button onClick={onSubmit} className='submit-button'>Submit</button>
        <button onClick={onClose} className='close-button ml-2'>Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
