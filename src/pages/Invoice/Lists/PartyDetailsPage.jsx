import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PartyDetails from './PartyDetails';
import { BASE_URL } from "../../../constants.js";
import Topbar from '../../../components/Topbar';
import Sidebar from '../../../components/Sidebar';

const PartyDetailsPage = () => {
  const { id } = useParams();
  const [party, setParty] = useState(null);

  // Fetch party details by ID from the API
  const getPartyById = async () => {
    try {
      let token = JSON.parse(localStorage.getItem("itaxData"));
      console.log(token.token);

      const response = await fetch(`${BASE_URL}/invoice/parties/${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.party);
        setParty(data.party);
      } else {
        console.error('Failed to fetch party by ID');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch party details on component mount
  useEffect(() => {
    getPartyById();
  }, [id]);

  // Function to handle saving the edited party details
  const handleEditParty = async (editedParty) => {
    try {
      let token = JSON.parse(localStorage.getItem("itaxData"));
      console.log(token.token);

      const response = await fetch(`${BASE_URL}/invoice/parties/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.token}`,
        },
        body: JSON.stringify(editedParty),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Party details updated:", data.party);
        setParty(data.party);
      } else {
        console.error('Failed to update party details');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container w-full">
          <div className="container mx-auto p-4">
            {party ? (
              <PartyDetails party={party} onEdit={handleEditParty} />
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyDetailsPage;
