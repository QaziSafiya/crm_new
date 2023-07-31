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
    <div className="p-4 bg-white rounded mb-4 w-full pl-12">
     
      <div className="border-b py-2 w-full">
            <p className="block mb-2 text-primary font-bold">Item Name:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">{item.itemName}</p>
          </div>
      {isEditing ? (
        <div className="">
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Unit:</p>
            <input
              type="text"
              name="unit"
              value={editedItem.unit}
              onChange={handleInputChange}
              className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
            />
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Price:</p>
            <input
              type="number"
              name="price"
              value={editedItem.price}
              onChange={handleInputChange}
              className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
            />
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Opening Stock:</p>
            <input
              type="number"
              name="openingStock"
              value={editedItem.openingStock}
              onChange={handleInputChange}
              className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
            />
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Closing Stock:</p>
            <input
              type="number"
              name="closingStock"
              value={editedItem.closingStock}
              onChange={handleInputChange}
              className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
            />
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Purchase Price:</p>
            <input
              type="number"
              name="purchasePrice"
              value={editedItem.purchasePrice}
              onChange={handleInputChange}
              className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
            />
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Description:</p>
            <input
              type="text"
              name="description"
              value={editedItem.description}
              onChange={handleInputChange}
              className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
            />
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">HSN Code:</p>
            <input
              type="text"
              name="hsnCode"
              value={editedItem.hsnCode}
              onChange={handleInputChange}
              className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
            />
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">User Id:</p>
            <input
              type="text"
              name="userId"
              value={editedItem.userId}
              onChange={handleInputChange}
              className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
            />
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Updated At:</p>
            <input
              type="text"
              name="updatedAt"
              value={editedItem.updatedAt}
              onChange={handleInputChange}
              className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
            />
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">ID:</p>
            <input
              type="text"
              name="id"
              value={editedItem.id}
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
        <div className="mb-4 border-b border-gray-300 g-1rem w-full">
          <div className="border-b py-2 w-full">
            <p className="block mb-2 text-primary font-bold">Unit:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">{item.unit}</p>
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Price:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">₹ {item.price}</p>
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Opening Stock:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">{item.openingStock}</p>
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Closing Stock:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">{item.closingStock}</p>
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Purchase Price:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">₹ {item.purchasePrice}</p>
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Description:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">{item.description}</p>
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">HSN Code:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">{item.hsnCode}</p>
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">User Id:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">{item.userId}</p>
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">Updated At:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">{item.updatedAt}</p>
          </div>
          <div className="border-b py-2">
            <p className="block mb-2 text-primary font-bold">ID:</p>
            <p className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline">{item.id}</p>
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
