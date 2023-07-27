import React from 'react';

const ItemDetails = ({ item }) => {
  return (
    <div className="p-4 bg-white rounded  mb-4">
      <h2 className="text-2xl font-bold mb-4">{item.itemName}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Unit:</p>
          <p className="font-bold">{item.unit}</p>
        </div>
        <div>
          <p className="text-gray-600">Price:</p>
          <p className="font-bold">₹ {item.price}</p>
        </div>
        <div>
          <p className="text-gray-600">Opening Stock:</p>
          <p className="font-bold">{item.openingStock}</p>
        </div>
        <div>
          <p className="text-gray-600">Closing Stock:</p>
          <p className="font-bold">{item.closingStock}</p>
        </div>
        <div>
          <p className="text-gray-600">Purchase Price:</p>
          <p className="font-bold">₹ {item.purchasePrice}</p>
        </div>
        <div>
          <p className="text-gray-600">Description:</p>
          <p className="font-bold">{item.description}</p>
        </div>
        <div>
          <p className="text-gray-600">HSN Code:</p>
          <p className="font-bold">{item.hsnCode}</p>
        </div>
        <div>
          <p className="text-gray-600">User Id:</p>
          <p className="font-bold">{item.userId}</p>
        </div>
      </div>
      {/* Add more item details as needed */}
    </div>
  );
};

export default ItemDetails;
