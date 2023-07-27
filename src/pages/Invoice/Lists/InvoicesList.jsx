import React, { useState, useEffect } from "react";
import axios from "axios";

import { BASE_URL } from "../../../constants.js";
import { RiBillLine, RiInformationFill } from "react-icons/ri";
import ViewIcon from "../../../components/icons/ViewIcon.jsx";
import { Link } from "react-router-dom";


 // Replace with your actual base URL

const InvoicesList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    // Fetch all invoices when the component mounts
    getInvoices();
  }, []);

  const getInvoices = async () => {
    let token = JSON.parse(localStorage.getItem("itaxData"));
    console.log(token.token);
  
    // Replace 'your-api-endpoint' with your actual API endpoint
    await fetch(`${BASE_URL}/invoice/invoices`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiSGFyc2giLCJsYXN0TmFtZSI6IlNpbmdoIiwiYWRkcmVzcyI6bnVsbCwiYWFkaGFhciI6bnVsbCwicGFuIjpudWxsLCJlbWFpbCI6ImhhcnNoc2luZ2guanNAZ21haWwuY29tIiwicGhvbmUiOiI3NjUyMDM1MTUyIiwidXNlclR5cGUiOiJhZG1pbiIsInZlcmlmaWVkIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTEzVDEzOjQzOjExLjE1N1oiLCJpYXQiOjE2ODk0MDM1NjQsImV4cCI6MTcyMDk2MTE2NCwiaXNzIjoiaVRheEVhc3kifQ.Ol-SkcIFpxrLKDjuF3jJqJw6S18zIrcp4ftKDQtq0VM`,
      },
      
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInvoices(data.invoices)
        // Do something with the response data if needed
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  };

  return (
    <div className="w-full mt-16 ">
      <h1 className="text-secondary font-bold mb-4">All Invoices</h1>
      <div className="pt-10">
      {invoices.length === 0 ? (
        <div className="text-center text-gray-500">
          <RiBillLine className="inline-block text-6xl mb-4" />
          <p>No invoices found</p>
        </div>
      ) : (
        <div className="section p-0">
            <div className="scrollable">
        <table className="w-full border-collapse border border-gray-400">
          <thead className="bg-blue-300">
            <tr>
              <th className="border border-gray-400 px-4 py-2">Invoice Number</th>
              <th className="border border-gray-400 px-4 py-2">Party Name</th>
              <th className="border border-gray-400 px-4 py-2">Total Amount</th>
              <th className="border border-gray-400 px-4 py-2">State of Supply</th>
              <th className="border border-gray-400 px-4 py-2">CGST</th>
              <th className="border border-gray-400 px-4 py-2">SGST</th>
              <th className="border border-gray-400 px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice,index) => (
              <tr key={invoice.invoiceNumber}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-blue-25"
              } border-b border-gray-300`}
               >
                <td className="border border-gray-400 px-4 py-2">{invoice.invoiceNumber}</td>
                <td className="border border-gray-400 px-4 py-2">{invoice.partyName}</td>
                <td className="border border-gray-400 px-4 py-2">₹{invoice.totalAmount}</td>
                <td className="border border-gray-400 px-4 py-2">{invoice.stateOfSupply}</td>
                <td className="border border-gray-400 px-4 py-2">{invoice.cgst}%</td>
                <td className="border border-gray-400 px-4 py-2">{invoice.sgst}%</td>
                <td className="border border-gray-400 px-4 py-2">
                <Link to={`/invoice/invoices/${invoice.id}`} 
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
        </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default InvoicesList;
