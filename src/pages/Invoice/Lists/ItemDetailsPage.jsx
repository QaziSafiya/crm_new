import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../../constants.js';
import ItemDetails from './ItemDetails.jsx';
import Sidebar from '../../../components/Sidebar.jsx';
import Topbar from '../../../components/Topbar.jsx';

const ItemDetailsPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  const getItemById = async () => {
    try {
      let token = JSON.parse(localStorage.getItem('itaxData'));
      console.log(token.token);

      const response = await fetch(`${BASE_URL}/invoice/items/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.item);
        setItem(data.item);
      } else {
        console.error('Failed to fetch item by ID');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemEdit = async (editedItem) => {
    try {
      let token = JSON.parse(localStorage.getItem('itaxData'));

      const response = await fetch(`${BASE_URL}/invoice/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify(editedItem),
      });

      if (response.ok) {
        // Item successfully updated, you may want to display a success message or perform any other action.
        console.log('Item updated successfully');
        setItem(editedItem); // Update the local item state with the edited item data.
      } else {
        console.error('Failed to update item');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItemById();
  }, [id]);

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container w-full">
          <div className="container mx-auto p-4 w-full">
            {item ? (
              <div className="p-4 bg-white rounded shadow w-full">
                <ItemDetails item={item} onEdit={handleItemEdit} />
              </div>
            ) : (
              <p className="text-center text-gray-600">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPage;
