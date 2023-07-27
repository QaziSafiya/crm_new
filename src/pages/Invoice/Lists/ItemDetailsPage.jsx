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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiSGFyc2giLCJsYXN0TmFtZSI6IlNpbmdoIiwiYWRkcmVzcyI6bnVsbCwiYWFkaGFhciI6bnVsbCwicGFuIjpudWxsLCJlbWFpbCI6ImhhcnNoc2luZ2guanNAZ21haWwuY29tIiwicGhvbmUiOiI3NjUyMDM1MTUyIiwidXNlclR5cGUiOiJhZG1pbiIsInZlcmlmaWVkIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTEzVDEzOjQzOjExLjE1N1oiLCJpYXQiOjE2ODk0MDM1NjQsImV4cCI6MTcyMDk2MTE2NCwiaXNzIjoiaVRheEVhc3kifQ.Ol-SkcIFpxrLKDjuF3jJqJw6S18zIrcp4ftKDQtq0VM`,
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

  useEffect(() => {
    getItemById();
  }, [id]);

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container w-full">
    <div className="container mx-auto p-4">
      {item ? (
        <div className="p-4 bg-white rounded shadow">
          <ItemDetails item={item} />
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
