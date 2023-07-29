import React, { useState } from 'react';

const PartyDetails = ({ party, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedParty, setEditedParty] = useState({ ...party });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedParty((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSaveClick = () => {
    onEdit(editedParty);
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h2 className="text-2xl font-bold mb-2">{party.partyName}</h2>
      <p className="text-gray-600 mb-2">Type: {party.type}</p>

      {isEditing ? (
        <div>
          <div className="border-b py-2">
            <p className="text-gray-600">Bank Name:</p>
            <input
              type="text"
              name="bankName"
              value={editedParty.bankName}
              onChange={handleInputChange}
              className="font-bold w-full"
            />
          </div>

          <div className="border-b py-2">
            <p className="text-gray-600">Bank Branch:</p>
            <input
              type="text"
              name="bankBranch"
              value={editedParty.bankBranch}
              onChange={handleInputChange}
              className="font-bold w-full"
            />
          </div>

          <div className="border-b py-2">
            <p className="text-gray-600">Bank Account Number:</p>
            <input
              type="text"
              name="bankAccountNumber"
              value={editedParty.bankAccountNumber}
              onChange={handleInputChange}
              className="font-bold w-full"
            />
          </div>

          <div className="border-b py-2">
            <p className="text-gray-600">Bank IFSC:</p>
            <input
              type="text"
              name="bankIfsc"
              value={editedParty.bankIfsc}
              onChange={handleInputChange}
              className="font-bold w-full"
            />
          </div>

          <div className="border-b py-2">
            <p className="text-gray-600">PAN:</p>
            <input
              type="text"
              name="pan"
              value={editedParty.pan}
              onChange={handleInputChange}
              className="font-bold w-full"
            />
          </div>

          <div className="border-b py-2">
            <p className="text-gray-600">Phone:</p>
            <input
              type="text"
              name="phone"
              value={editedParty.phone}
              onChange={handleInputChange}
              className="font-bold w-full"
            />
          </div>

          <div className="col-span-2 mt-4">
            <button
              onClick={handleSaveClick}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="border-b py-2">
            <p className="text-gray-600">Bank Name:</p>
            <p>{party.bankName}</p>
          </div>

          <div className="border-b py-2">
            <p className="text-gray-600">Bank Branch:</p>
            <p>{party.bankBranch}</p>
          </div>

          <div className="border-b py-2">
            <p className="text-gray-600">Bank Account Number:</p>
            <p>{party.bankAccountNumber}</p>
          </div>

          <div className="border-b py-2">
            <p className="text-gray-600">Bank IFSC:</p>
            <p>{party.bankIfsc}</p>
          </div>

          <div className="border-b py-2">
            <p className="text-gray-600">PAN:</p>
            <p>{party.pan}</p>
          </div>

          <div className="border-b py-2">
            <p className="text-gray-600">Phone:</p>
            <p>{party.phone}</p>
          </div>

          <div className="col-span-2 mt-4">
            <button
              onClick={handleEditClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Edit
            </button>
          </div>
        </div>
      )}

      <p className="text-gray-500 mt-4">Updated At: {party.updatedAt}</p>
      {/* Add more party details as needed */}
    </div>
  );
};

export default PartyDetails;
