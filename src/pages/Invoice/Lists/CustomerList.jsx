import axios from "axios";
import React, { useState, useEffect } from "react";
import { RiBillLine } from "react-icons/ri";
import { BASE_URL } from "../../../constants";
import { Link } from "react-router-dom";
import ViewIcon from "../../../components/icons/ViewIcon";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;

  useEffect(() => {
    // Fetch all customers when the component mounts
    getCustomers();
  }, []);

  const getCustomers = async () => {
    try {
      let token = JSON.parse(localStorage.getItem("itaxData"));
      const response = await axios.get(`${BASE_URL}/invoice/parties`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.token}`,
        },
      });

      if (response.status === 200) {
        let filtered = response.data.parties.filter((el) => {
          return el.type === "customer";
        });
        setCustomers(filtered);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleDeleteCustomer = async (deletedCustomerId) => {
    try {
      const token = JSON.parse(localStorage.getItem("itaxData")).token;

      await axios.delete(`${BASE_URL}/invoice/parties/${deletedCustomerId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the customers list by removing the deleted customer
      setCustomers(customers.filter((customer) => customer.id !== deletedCustomerId));
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // Calculate the index of the last customer on the current page
  const indexOfLastCustomer = currentPage * customersPerPage;
  // Calculate the index of the first customer on the current page
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  // Get the current page customers to display
  const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  // Calculate the total number of pages
  const totalPages = Math.ceil(customers.length / customersPerPage);

  return (
    <div className="w-full mt-16">
      <h1 className="text-secondary font-bold mb-4">All Customers</h1>
      <div className="pt-10">
        {currentCustomers.length === 0 ? (
          <div className="text-center text-gray-500">
            <RiBillLine className="inline-block text-6xl mb-4" />
            <p>No Customers found</p>
          </div>
        ) : (
          <div className="section p-0">
            <div className="scrollable">
              <table className="w-full border-collapse border border-gray-400">
                <thead className="bg-blue-300">
                  <tr>
                    <th className="border border-gray-400 px-4 py-2">Customer Name</th>
                    <th className="border border-gray-400 px-4 py-2">Type</th>
                    <th className="border border-gray-400 px-4 py-2">Bank Name</th>
                    <th className="border border-gray-400 px-4 py-2">Bank Branch</th>
                    <th className="border border-gray-400 px-4 py-2">Address</th>
                    <th className="border border-gray-400 px-4 py-2">Details</th>
                    <th className="border border-gray-400 px-4 py-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCustomers.map((customer, index) => (
                    <tr key={customer.id} className={`${index % 2 === 0 ? "bg-white" : "bg-blue-25"} border-b border-gray-300`}>
                      <td className="border border-gray-400 px-4 py-2">{customer.partyName}</td>
                      <td className="border border-gray-400 px-4 py-2">{customer.type}</td>
                      <td className="border border-gray-400 px-4 py-2">{customer.bankName}</td>
                      <td className="border border-gray-400 px-4 py-2">{customer.bankBranch}</td>
                      <td className="border border-gray-400 px-4 py-2">{customer.address}</td>
                      <td className="border border-gray-400 px-4 py-2">
                        <Link to={`/invoice/addparty/${customer.id}`} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ">
                          <ViewIcon className="mr-2" />
                          Details
                        </Link>
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        <button onClick={() => handleDeleteCustomer(customer.id)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
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

        {/* Pagination */}
        {customers.length > 0 && (
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
      </div>
    </div>
  );
};

export default CustomerList;
