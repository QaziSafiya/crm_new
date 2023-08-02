// ItemDropdown.jsx
import React from "react";

const ItemDropdown = ({ showDropdown, itemList, handleSelectItem }) => {
  if (!showDropdown || itemList.length === 0) {
    return null;
  }

  return (
    <ul className="bg-white border border-gray-300 mt-2 rounded shadow-lg absolute z-40 w-full">
      <p className="bg-blue-300 text-white px-4">Item Name</p>
      {itemList.map((item) => (
        <li
          key={item.id}
          onMouseDown={() => handleSelectItem(item)} // Use onMouseDown instead of onClick
          className="px-4 py-2 cursor-pointer hover:bg-gray-300"
          title="Add"
        >
          {item.itemName}
        </li>
      ))}
    </ul>
  );
};

export default ItemDropdown;
