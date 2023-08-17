import React from 'react';
import Invoice from './Invoice';

const invoiceData = {
  id: "af5e668b-2b66-41d7-872d-6aaa19401e15",
  invoiceNumber: 1,
  type: "sales",
  partyId: "9b7608ce-45f5-4342-9671-beb57d8d791b",
  phone: "9876543210",
  partyName: "XY Company",
  totalAmount: 1000,
  totalGst: 180,
  stateOfSupply: "Lucknow",
  cgst: 9,
  sgst: 9,
  igst: 0,
  utgst: 0,
  details: "Invoice details",
  extraDetails: "Extra details",
  userId: 1,
  createdAt: "2023-07-29T08:48:12.361Z",
  updatedAt: "2023-07-29T08:48:12.361Z",
};

const Show = ({invoiceData}) => {
  return (
    <div>
      <Invoice invoiceData={invoiceData} />
    </div>
  );
};

export default Show;
