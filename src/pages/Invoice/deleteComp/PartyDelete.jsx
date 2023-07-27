import React from 'react';
import { BASE_URL } from '../../../constants.js';

const PartyDelete = ({ itemId, onDelete }) => {
  const handleDelete = async () => {
    try {
      let token = JSON.parse(localStorage.getItem("itaxData"));
      console.log(token.token);

      const response = await fetch(`${BASE_URL}/invoice/parties/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      if (response.ok) {
        onDelete();
        console.log('Item deleted successfully.');
      } else {
        console.error('Failed to delete item.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
    >
      Delete
    </button>
  );
};

export default PartyDelete;
