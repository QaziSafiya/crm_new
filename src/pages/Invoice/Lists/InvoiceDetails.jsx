import React from 'react';

const InvoiceDetails = ({ invoice }) => {
  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h2 className="text-2xl font-bold mb-4">{invoice.partyName}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="border-b py-2">
          <p className="text-gray-600">Type:</p>
          <p className="font-bold">{invoice.type}</p>
        </div>
        <div className="border-b py-2">
          <p className="text-gray-600">Party Id:</p>
          <p className="font-bold">{invoice.partyId}</p>
        </div>
        <div className="border-b py-2">
          <p className="text-gray-600">Total Amount:</p>
          <p className="font-bold">₹ {invoice.totalAmount}</p>
        </div>
        <div className="border-b py-2">
          <p className="text-gray-600">State Of Supply:</p>
          <p className="font-bold">{invoice.stateOfSupply}</p>
        </div>
        <div className="border-b py-2">
          <p className="text-gray-600">Total Gst:</p>
          <p className="font-bold">{invoice.totalGst}</p>
        </div>
        <div className="border-b py-2">
          <p className="text-gray-600">Phone:</p>
          <p className="font-bold">{invoice.phone}</p>
        </div>
      </div>
      {/* Add more invoice details as needed */}
    </div>
  );
};

export default InvoiceDetails;
