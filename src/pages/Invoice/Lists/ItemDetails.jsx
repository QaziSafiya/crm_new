import React, { useState } from 'react';

const ItemDetails = ({ item, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({ ...item });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSaveClick = () => {
    onEdit(editedItem);
    setIsEditing(false);
  };

  return (
    <div className="p-4 bg-white rounded mb-4">
      <h2 className="text-2xl font-bold mb-4">{item.itemName}</h2>
      {isEditing ? (
        <div className="grid grid-cols-2 gap-4">
          <div className="border-b py-2">
            <p className="text-gray-600">Unit:</p>
            <input
              type="text"
              name="unit"
              value={editedItem.unit}
              onChange={handleInputChange}
              className="font-bold w-full"
            />
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">Price:</p>
            <input
              type="number"
              name="price"
              value={editedItem.price}
              onChange={handleInputChange}
              className="font-bold w-full"
            />
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">Opening Stock:</p>
            <input
              type="number"
              name="openingStock"
              value={editedItem.openingStock}
              onChange={handleInputChange}
              className="font-bold w-full"
            />
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">Closing Stock:</p>
            <input
              type="number"
              name="closingStock"
              value={editedItem.closingStock}
              onChange={handleInputChange}
              className="font-bold w-full"
            />
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">Purchase Price:</p>
            <input
              type="number"
              name="purchasePrice"
              value={editedItem.purchasePrice}
              onChange={handleInputChange}
              className="font-bold w-full"
            />
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">Description:</p>
            <input
              type="text"
              name="description"
              value={editedItem.description}
              onChange={handleInputChange}
              className="font-bold w-full"
            />
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">HSN Code:</p>
            <input
              type="text"
              name="hsnCode"
              value={editedItem.hsnCode}
              onChange={handleInputChange}
              className="font-bold w-full"
            />
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">User Id:</p>
            <input
              type="text"
              name="userId"
              value={editedItem.userId}
              onChange={handleInputChange}
              className="font-bold w-full"
            />
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">Updated At:</p>
            <input
              type="text"
              name="updatedAt"
              value={editedItem.updatedAt}
              onChange={handleInputChange}
              className="font-bold w-full"
            />
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">ID:</p>
            <input
              type="text"
              name="id"
              value={editedItem.id}
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
        <div className="grid grid-cols-2 gap-4">
          <div className="border-b py-2">
            <p className="text-gray-600">Unit:</p>
            <p className="font-bold">{item.unit}</p>
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">Price:</p>
            <p className="font-bold">₹ {item.price}</p>
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">Opening Stock:</p>
            <p className="font-bold">{item.openingStock}</p>
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">Closing Stock:</p>
            <p className="font-bold">{item.closingStock}</p>
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">Purchase Price:</p>
            <p className="font-bold">₹ {item.purchasePrice}</p>
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">Description:</p>
            <p className="font-bold">{item.description}</p>
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">HSN Code:</p>
            <p className="font-bold">{item.hsnCode}</p>
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">User Id:</p>
            <p className="font-bold">{item.userId}</p>
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">Updated At:</p>
            <p className="font-bold">{item.updatedAt}</p>
          </div>
          <div className="border-b py-2">
            <p className="text-gray-600">ID:</p>
            <p className="font-bold">{item.id}</p>
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
    </div>
  );
};

export default ItemDetails;
