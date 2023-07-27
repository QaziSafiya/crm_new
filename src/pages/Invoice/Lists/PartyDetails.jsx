import React from 'react';
import PartyDelete from '../deleteComp/PartyDelete';

const PartyDetails = ({ party,onDelete }) => {
  const handleDelete = () => {
    onDelete(party.id); // Pass the invoice id to the parent component for updating the list
  };
  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h2 className="text-2xl font-bold mb-2">{party.partyName}</h2>
      <p className="text-gray-600 mb-2">Type: {party.type}</p>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Bank Name: {party.bankName}</p>
          <p className="text-gray-600">Bank Branch: {party.bankBranch}</p>
          <p className="text-gray-600">Bank Account Number: {party.bankAccountNumber}</p>
        </div>
        <div>
          <p className="text-gray-600">Bank IFSC: {party.bankIfsc}</p>
          <p className="text-gray-600">PAN: {party.pan}</p>
          <p className="text-gray-600">Phone: {party.phone}</p>
        </div>
      </div>
      <p className="text-gray-500 mt-4">Updated At: {party.updatedAt}</p>
      {/* Add more party details as needed */}
      <div>
      <PartyDelete itemId={party.id} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default PartyDetails;
