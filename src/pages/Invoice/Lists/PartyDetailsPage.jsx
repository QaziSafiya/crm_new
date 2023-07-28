import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PartyDetails from './PartyDetails';
import {BASE_URL} from "../../../constants.js";
import Topbar from '../../../components/Topbar';
import Sidebar from '../../../components/Sidebar';

const PartyDetailsPage = () => {
  const { id } = useParams();
  const [party, setParty] = useState(null);

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
 


  
  useEffect(() => {
    getPartyById();
  }, [id]);

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container w-full">
    <div className="container mx-auto p-4">
      {party ? <PartyDetails party={party}  /> : <p>Loading...</p>}
    </div>
    </div>
    </div>
    </div>
    
  );
};

export default PartyDetailsPage;
