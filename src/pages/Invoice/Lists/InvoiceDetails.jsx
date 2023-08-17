import React from 'react';

const InvoiceDetails = ({ invoice }) => {
  return (
    <div className="p-4 bg-white rounded mb-4 w-full pl-12">
      <h2 className="text-2xl font-bold mb-4">{invoice.partyName}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="border-b py-2">
          <p className="block mb-2 text-primary font-bold">Type:</p>
          <p className="font-bold">{invoice.type}</p>
        </div>
        <div className="border-b py-2">
          <p className="block mb-2 text-primary font-bold">Party Id:</p>
          <p className="font-bold">{invoice.partyId}</p>
        </div>

        <div className="border-b py-2">
          <p className="block mb-2 text-primary font-bold">User Id:</p>
          <p className="font-bold">{invoice.userId}</p>
        </div>

        <div className="border-b py-2">
          <p className="block mb-2 text-primary font-bold">Total Amount:</p>
          <p className="font-bold">₹ {invoice.totalAmount}</p>
        </div>
        <div className="border-b py-2">
          <p className="block mb-2 text-primary font-bold">State Of Supply:</p>
          <p className="font-bold">{invoice.stateOfSupply}</p>
        </div>
        <div className="border-b py-2">
          <p className="block mb-2 text-primary font-bold">Total Gst:</p>
          <p className="font-bold">{invoice.totalGst}</p>
        </div>
        <div className="border-b py-2">
          <p className="block mb-2 text-primary font-bold">Phone:</p>
          <p className="font-bold">{invoice.phone}</p>
        </div>

        <div className="border-b py-2">
          <p className="block mb-2 text-primary font-bold">Details:</p>
          <p className="font-bold">{invoice.details}</p>
        </div>

        <div className="border-b py-2">
          <p className="block mb-2 text-primary font-bold">Extra Details:</p>
          <p className="font-bold">{invoice.extraDetails}</p>
        </div>

        <div className="border-b py-2">
          <p className="block mb-2 text-primary font-bold">Mode Of Payment:</p>
          <p className="font-bold">{invoice.modeOfPayment}</p>
        </div>

        <div className="border-b py-2">
          <p className="block mb-2 text-primary font-bold">Created At:</p>
          <p className="font-bold">{invoice.createdAt}</p>
        </div>

        <div className="border-b py-2">
          <p className="block mb-2 text-primary font-bold">Updated At:</p>
          <p className="font-bold">{invoice.updatedAt}</p>
        </div>
      </div>
      {/* Add more invoice details as needed */}
    </div>
  );
};

export default InvoiceDetails;
