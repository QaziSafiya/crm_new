import axios from "axios";
import React, { useState, useEffect } from "react";
import { RiBillLine, RiInformationFill } from "react-icons/ri";
import { BASE_URL } from "../../../constants";
import { Link } from "react-router-dom";
import ViewIcon from "../../../components/icons/ViewIcon";


const ItemList = () => {
    const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch all invoices when the component mounts
    getItems();
  }, []);

  const getItems = async () => {
    
    let token = JSON.parse(localStorage.getItem("itaxData"));
    console.log(token.token);
  
    // Replace 'your-api-endpoint' with your actual API endpoint
    await fetch(`${BASE_URL}/invoice/items`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiSGFyc2giLCJsYXN0TmFtZSI6IlNpbmdoIiwiYWRkcmVzcyI6bnVsbCwiYWFkaGFhciI6bnVsbCwicGFuIjpudWxsLCJlbWFpbCI6ImhhcnNoc2luZ2guanNAZ21haWwuY29tIiwicGhvbmUiOiI3NjUyMDM1MTUyIiwidXNlclR5cGUiOiJhZG1pbiIsInZlcmlmaWVkIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTEzVDEzOjQzOjExLjE1N1oiLCJpYXQiOjE2ODk0MDM1NjQsImV4cCI6MTcyMDk2MTE2NCwiaXNzIjoiaVRheEVhc3kifQ.Ol-SkcIFpxrLKDjuF3jJqJw6S18zIrcp4ftKDQtq0VM`,
      },
      
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.items);
        setItems(data.items)
        // Do something with the response data if needed
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  };

  return (
    <div className="w-full mt-16 ">
      <h1 className="text-secondary font-bold mb-4">All Parties</h1>
      <div className="pt-10">
      {items.length === 0 ? (
        <div className="text-center text-gray-500">
          <RiBillLine className="inline-block text-6xl mb-4" />
          <p>No Parties found</p>
        </div>
      ) : (
        <table className="w-full border-collapse border border-gray-400">
          <thead className="bg-blue-300">
            <tr>
              <th className="border border-gray-400 px-4 py-2">Item Name</th>
              <th className="border border-gray-400 px-4 py-2">Price</th>
              <th className="border border-gray-400 px-4 py-2">Purchase Price</th>
              <th className="border border-gray-400 px-4 py-2">Opening Stock</th>

              {/* <th className="border border-gray-400 px-4 py-2">Tax Exempted</th> */}
              <th className="border border-gray-400 px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {items.map((invoice,index) => (
              <tr key={invoice.id} className={`${
                index % 2 === 0 ? "bg-white" : "bg-blue-25"
              } border-b border-gray-300`}>
                <td className="border border-gray-400 px-4 py-2">{invoice.itemName}</td>
                <td className="border border-gray-400 px-4 py-2">{invoice.price}</td>
                <td className="border border-gray-400 px-4 py-2">₹{invoice.purchasePrice}</td>
                <td className="border border-gray-400 px-4 py-2">₹{invoice.openingStock}</td>

                {/* <td className="border border-gray-400 px-4 py-2">{invoice.taxExempted}</td> */}
                <td className="border  px-4 py-2">
                <Link to={`/invoice/createitem/${invoice.id}`} 
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 "
                >
               
                <ViewIcon className="mr-2" />
                          Details
               
                </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
  )
}

export default ItemList