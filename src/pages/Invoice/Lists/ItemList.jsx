import axios from "axios";
import React, { useState, useEffect } from "react";
import { RiBillLine, RiInformationFill } from "react-icons/ri";
import { BASE_URL } from "../../../constants";
import { Link } from "react-router-dom";
import ViewIcon from "../../../components/icons/ViewIcon";

const ItemList = () => {
  const [items, setItems] = useState([]);

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

  return (
    <div className="w-full mt-16">
      <h1 className="text-secondary font-bold mb-4">All Items</h1>
      <div className="pt-10">
        {items.length === 0 ? (
          <div className="text-center text-gray-500">
            <RiBillLine className="inline-block text-6xl mb-4" />
            <p>No Items found</p>
          </div>
        ) : (
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
              {items.map((item, index) => (
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
                    {/* Add a "Delete" button */}
                   
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
        )}
      </div>
    </div>
  );
};

export default ItemList;



/*  
address: "Lucknow"
​​
bankAccountNumber: "41526"
​​
bankBranch: "Lucknow Branch"
​​
bankIfsc: "dsd5"
​​
bankName: "SBI"
​​
createdAt: "2023-07-27T06:58:04.652Z"
​​
email: "asd@gmail.com"
​​
gstin: "15263d"
​​
id: "20f577e9-6370-46de-8388-fc2fb77fe726"
​​
pan: "151adda"
​​
partyName: "abhi"
​​
phone: "9876543210"
​​
tan: null
​​
type: "supplier"
​​
updatedAt: "2023-07-27T06:58:04.652Z"
​​
upi: "sasa5"
​​
userId: 2








categoryId: null
​​
cgst: "6"
​​
closingStock: "50"
​​
createdAt: "2023-07-27T03:39:50.815Z"
​​
description: "personal"
​​
hsnCode: "HSN123"
​​
id: "511f4abc-3365-46c3-8b15-087ef1d3c1e3"
​​
igst: "0"
​​
itemName: "iphone"
​​
openingStock: "100"
​​
price: "500"
​​
purchasePrice: "40"
​​
sgst: "5"
​​
supplierId: null
​​
taxExempted: true
​​
unit: "pieces"
​​
updatedAt: "2023-07-27T03:39:50.815Z"
​​
userId: 2
​​
utgst: "0"

*/