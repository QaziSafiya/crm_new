import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'
import { Link } from 'react-router-dom'
import AddCircleIcon from '../../components/icons/AddCircleIcon'
import { BASE_URL } from '../../constants.js'
import { RiBillLine } from 'react-icons/ri'
import ViewIcon from '../../components/icons/ViewIcon'

const Purchase = () => {
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

  return (
    <div className="container">
    <Sidebar />
    <div className="main">
      <Topbar />
      <div className="inner-container">
    <div className="grid justify-items-end mb-0 p-4">
    <Link to={`/invoice/create/purchase`}>
                  <button
                    // onClick={handleAddPartyClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  flex items-center space-x-2"
                  >
                    <AddCircleIcon />
                    <div>Create Purchase</div>
                  </button>
                </Link>
    </div>
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
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
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
    </div>
    </div>
    </div>
    </div>
  )
}

export default Purchase