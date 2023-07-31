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
    <div className="p-4 bg-white rounded shadow mb-4 w-full pl-12">
        <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Party Name:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">{party.partyName}</p>
         </div>

         <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Party Type:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">{party.type}</p>
         </div>

      {isEditing ? (
        <div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Bank Name:</p>
            <input
              type="text"
              name="bankName"
              value={editedParty.bankName}
              onChange={handleInputChange}
              className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
            />
          </div>

          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Bank Branch:</p>
            <input
              type="text"
              name="bankBranch"
              value={editedParty.bankBranch}
              onChange={handleInputChange}
              className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
            />
          </div>

          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Bank Account Number:</p>
            <input
              type="text"
              name="bankAccountNumber"
              value={editedParty.bankAccountNumber}
              onChange={handleInputChange}
              className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
            />
          </div>

          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Bank IFSC:</p>
            <input
              type="text"
              name="bankIfsc"
              value={editedParty.bankIfsc}
              onChange={handleInputChange}
              className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
            />
          </div>

          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">PAN:</p>
            <input
              type="text"
              name="pan"
              value={editedParty.pan}
              onChange={handleInputChange}
              className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
            />
          </div>

          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Phone:</p>
            <input
              type="text"
              name="phone"
              value={editedParty.phone}
              onChange={handleInputChange}
              className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
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
        <div className='mb-4 border-b border-gray-300 g-1rem'>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Bank Name:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">{party.bankName}</p>
          </div>

          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Bank Branch:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">{party.bankBranch}</p>
          </div>

          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Bank Account Number:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">{party.bankAccountNumber}</p>
          </div>

          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Bank IFSC:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">{party.bankIfsc}</p>
          </div>

          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">PAN:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">{party.pan}</p>
          </div>

          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Phone:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">{party.phone}</p>
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
