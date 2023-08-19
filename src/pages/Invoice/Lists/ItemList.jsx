import React, { useState, useEffect } from "react";
import { RiBillLine, RiInformationFill } from "react-icons/ri";
import { BASE_URL } from "../../../constants";
import { Link } from "react-router-dom";
import ViewIcon from "../../../components/icons/ViewIcon";
import axios from "axios";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("itaxData")).token;

      const response = await axios.get(`${BASE_URL}/invoice/items`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setItems(response.data.items);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleDeleteItem = async (deletedItemId) => {
    try {
      const token = JSON.parse(localStorage.getItem("itaxData")).token;
        
      await axios.delete(`${BASE_URL}/invoice/items/${deletedItemId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the items list by removing the deleted item
      setItems(items.filter((item) => item.id !== deletedItemId));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Calculate the index of the last item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item on the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current page items to display
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  // Calculate the total number of pages
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="w-full mt-16">
      <h1 className="text-secondary font-bold mb-4">All Items</h1>
      <div className="pt-10">
        {currentItems.length === 0 ? (
          <div className="text-center text-gray-500">
            <RiBillLine className="inline-block text-6xl mb-4" />
            <p>No Items found</p>
          </div>
        ) : (
          <>
            <table className="w-full border-collapse border border-gray-400">
              <thead className="bg-blue-300">
                <tr>
                  <th className="border border-gray-400 px-4 py-2">Item Name</th>
                  <th className="border border-gray-400 px-4 py-2">Price</th>
                  <th className="border border-gray-400 px-4 py-2">Purchase Price</th>
                  <th className="border border-gray-400 px-4 py-2">Opening Stock</th>
                  <th className="border border-gray-400 px-4 py-2">Details</th>
                  <th className="border border-gray-400 px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item.id} className={`${index % 2 === 0 ? "bg-white" : "bg-blue-25"} border-b border-gray-300`}>
                    <td className="border border-gray-400 px-4 py-2">{item.itemName}</td>
                    <td className="border border-gray-400 px-4 py-2">{item.price}</td>
                    <td className="border border-gray-400 px-4 py-2">₹{item.purchasePrice}</td>
                    <td className="border border-gray-400 px-4 py-2">₹{item.openingStock}</td>
                    <td className="border border-gray-400 px-4 py-2">
                      <Link to={`/invoice/createitem/${item.id}`} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ">
                        <ViewIcon className="mr-2" />
                        Details
                      </Link>
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <button onClick={() => handleDeleteItem(item.id)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {items.length > 0  && (
              <div className="flex justify-center mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span className="text-blue-500 px-2 py-1 rounded">
                  {currentPage} / {totalPages}
                </span>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                  onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ItemList;
