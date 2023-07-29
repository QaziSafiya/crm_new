import axios from "axios";
import React, { useState, useEffect } from "react";
import { RiBillLine, RiInformationFill } from "react-icons/ri";
import { BASE_URL } from "../../../constants";
import { Link } from "react-router-dom";
import ViewIcon from "../../../components/icons/ViewIcon";

const CustomerList = () => {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    // Fetch all parties when the component mounts
    getParties();
  }, []);

  const getParties = async () => {
    try {
      let token = JSON.parse(localStorage.getItem("itaxData"));
      const response = await axios.get(`${BASE_URL}/invoice/parties`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.token}`,
        },
      });

      if (response.status === 200) {
        let filtered=response.data.parties.filter((el)=>{
          return el.type=="customer"
        })
        setParties(filtered);
      }
    } catch (error) {
      console.error('Error fetching parties:', error);
    }
  };

  const handleDeleteParty = async (deletedPartyId) => {
    try {
      const token = JSON.parse(localStorage.getItem("itaxData")).token;
  
      await axios.delete(`${BASE_URL}/invoice/parties/${deletedPartyId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Update the parties list by removing the deleted party
      setParties(parties.filter((party) => party.id !== deletedPartyId));
    } catch (error) {
      console.error("Error deleting party:", error);
    }
  };
  

  return (
    <div className="w-full mt-16">
      <h1 className="text-secondary font-bold mb-4">All Customers</h1>
      <div className="pt-10">
        {parties.length === 0 ? (
          <div className="text-center text-gray-500">
            <RiBillLine className="inline-block text-6xl mb-4" />
            <p>No Parties found</p>
          </div>
        ) : (
          <div className="section p-0">
            <div className="scrollable">
              <table className="w-full border-collapse border border-gray-400">
                <thead className="bg-blue-300">
                  <tr>
                    <th className="border border-gray-400 px-4 py-2">Party Name</th>
                    <th className="border border-gray-400 px-4 py-2">Type</th>
                    <th className="border border-gray-400 px-4 py-2">Bank Name</th>
                    <th className="border border-gray-400 px-4 py-2">Bank Branch</th>
                    <th className="border border-gray-400 px-4 py-2">Address</th>
                    <th className="border border-gray-400 px-4 py-2">Details</th>
                    <th className="border border-gray-400 px-4 py-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {parties.map((party, index) => (             
                    <tr key={party.id} className={`${index % 2 === 0 ? "bg-white" : "bg-blue-25"} border-b border-gray-300`}>
                      <td className="border border-gray-400 px-4 py-2">{party.partyName}</td>
                      <td className="border border-gray-400 px-4 py-2">{party.type}</td>
                      <td className="border border-gray-400 px-4 py-2">{party.bankName}</td>
                      <td className="border border-gray-400 px-4 py-2">{party.bankBranch}</td>
                      <td className="border border-gray-400 px-4 py-2">{party.address}</td>
                      <td className="border border-gray-400 px-4 py-2">
                        <Link to={`/invoice/addparty/${party.id}`} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 ">
                          <ViewIcon className="mr-2" />
                          Details
                        </Link>
                        {/* Add a "Delete" button */}
                       
                      </td>
                      <td className="border border-gray-400 px-4 py-2"> 
                      <button onClick={() => handleDeleteParty(party.id)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
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
  );
};

export default CustomerList;