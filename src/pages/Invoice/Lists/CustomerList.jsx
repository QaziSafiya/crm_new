// ... (previous code)

import axios from "axios";
import React, { useState, useEffect } from "react";
import { RiBillLine, RiInformationFill } from "react-icons/ri";
import { BASE_URL } from "../../../constants";
import { Link } from "react-router-dom";
import ViewIcon from "../../../components/icons/ViewIcon";

const CustomerList = () => {
  // ... (previous code)
  const [parties, setParties] = useState([]);
  const [editedParty, setEditedParty] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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
        let filtered = response.data.parties.filter((el) => {
          return el.type === "customer";
        });
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

  const handleEditParty = (party) => {
    setEditedParty({ ...party });
    setIsEditing(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedParty((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSaveParty = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("itaxData")).token;

      await axios.put(`${BASE_URL}/invoice/parties/${editedParty.id}`, editedParty, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the parties list with the edited party
      setParties(parties.map((party) => (party.id === editedParty.id ? editedParty : party)));

      // Reset edit state
      setIsEditing(false);
      setEditedParty(null);
    } catch (error) {
      console.error("Error saving party:", error);
    }
  };

  return (
    <div className="w-full mt-16">
      <h1 className="text-secondary font-bold mb-4">All Customers</h1>
      <div className="pt-10">
        {parties.length === 0 ? (
          // ... (No parties found)
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
                    <th className="border border-gray-400 px-4 py-2">Phone</th>
                    <th className="border border-gray-400 px-4 py-2">Email</th>
                    <th className="border border-gray-400 px-4 py-2">GSTIN</th>
                    <th className="border border-gray-400 px-4 py-2">Details</th>
                    <th className="border border-gray-400 px-4 py-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {parties.map((party, index) => (
                    <tr key={party.id} className={`${index % 2 === 0 ? "bg-white" : "bg-blue-25"} border-b border-gray-300`}>
                      <td className="border border-gray-400 px-4 py-2">
                        {isEditing && editedParty?.id === party.id ? (
                          <input
                            type="text"
                            name="partyName"
                            value={editedParty.partyName}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          party.partyName
                        )}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {isEditing && editedParty?.id === party.id ? (
                          <input
                            type="text"
                            name="type"
                            value={editedParty.type}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          party.type
                        )}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {isEditing && editedParty?.id === party.id ? (
                          <input
                            type="text"
                            name="bankName"
                            value={editedParty.bankName}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          party.bankName
                        )}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {isEditing && editedParty?.id === party.id ? (
                          <input
                            type="text"
                            name="bankBranch"
                            value={editedParty.bankBranch}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          party.bankBranch
                        )}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {isEditing && editedParty?.id === party.id ? (
                          <input
                            type="text"
                            name="address"
                            value={editedParty.address}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          party.address
                        )}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {isEditing && editedParty?.id === party.id ? (
                          <input
                            type="text"
                            name="phone"
                            value={editedParty.phone}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          party.phone
                        )}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {isEditing && editedParty?.id === party.id ? (
                          <input
                            type="text"
                            name="email"
                            value={editedParty.email}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          party.email
                        )}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {isEditing && editedParty?.id === party.id ? (
                          <input
                            type="text"
                            name="gstin"
                            value={editedParty.gstin}
                            onChange={handleInputChange}
                            className="border rounded px-2 py-1 w-full"
                          />
                        ) : (
                          party.gstin
                        )}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        <Link to={`/invoice/addparty/${party.id}`} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                          <ViewIcon className="mr-2" />
                          Details
                        </Link>
                      </td>
                      <td className="border border-gray-400 px-4 py-2"> 
                      <button onClick={() => handleDeleteParty(party.id)} className="ml-2 bg-red-500 text-white px-4 py-2 rounded">
                          Delete
                        </button>
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {isEditing && editedParty?.id === party.id ? (
                          <>
                            <button onClick={handleSaveParty} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded mr-2">
                              Save
                            </button>
                            <button onClick={() => setIsEditing(false)} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button onClick={() => handleEditParty(party)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
                            Edit
                          </button>
                        )}
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
