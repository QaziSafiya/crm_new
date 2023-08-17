import React, { useState, useEffect } from "react";
import axios from "axios";

import { BASE_URL } from "../../../constants.js";
import { RiBillLine, RiInformationFill } from "react-icons/ri";
import ViewIcon from "../../../components/icons/ViewIcon.jsx";
import { Link } from "react-router-dom";

// Replace with your actual base URL

const InvoicesList = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


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
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setInvoices(data.invoices);
        // Do something with the response data if needed
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  };

  const handleDeleteInvoice = async (deletedInvoiceId) => {
    try {
      const token = JSON.parse(localStorage.getItem("itaxData")).token;
      await axios.delete(`${BASE_URL}/invoice/invoices/${deletedInvoiceId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the invoices list by removing the deleted invoice
      setInvoices(
        invoices.filter((invoice) => invoice.id !== deletedInvoiceId)
      );
    } catch (error) {
      console.error("Error deleting invoice:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = invoices.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(invoices.length / itemsPerPage);

  return (
    <div className="w-full mt-16 ">
      <h1 className="text-secondary font-bold mb-4">All Invoices</h1>
      <div className="pt-10">
        {currentItems.length === 0 ? (
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
                    <th className="border border-gray-400 px-4 py-2">
                      Invoice Number
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Party Name
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      Total Amount
                    </th>
                    <th className="border border-gray-400 px-4 py-2">
                      State of Supply
                    </th>
                    <th className="border border-gray-400 px-4 py-2">CGST</th>
                    <th className="border border-gray-400 px-4 py-2">SGST</th>
                    <th className="border border-gray-400 px-4 py-2">
                      Details
                    </th>
                    <th className="border border-gray-400 px-4 py-2 pl-7">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((invoice, index) => (
                    <tr
                      key={invoice.invoiceNumber}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-blue-25"
                      } border-b border-gray-300`}
                    >
                      <td className="border border-gray-400 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {invoice.partyName}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        ₹{invoice.totalAmount}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {invoice.stateOfSupply}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {invoice.cgst}%
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {invoice.sgst}%
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        <Link
                          to={`/invoice/invoices/${invoice.id}`}
                          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 "
                        >
                          <ViewIcon className="mr-2" />
                          Details
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDeleteInvoice(invoice.id)}
                          className="ml-2 bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            </div>
            
          </div>
        )}
      </div>
      {/* Pagination */}
      {invoices.length > 0 && (
  <div className="flex justify-center mt-4">
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      onClick={() =>
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
      }
      disabled={currentPage === 1}
    >
      Prev
    </button>
    <span className="text-blue-500 px-2 py-1 rounded">
      {currentPage} / {totalPages}
    </span>
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
      onClick={() =>
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
      }
      disabled={currentPage === totalPages}
    >
      Next
    </button>
  </div>
)}
    </div>
  );
};

export default InvoicesList;
