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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiSGFyc2giLCJsYXN0TmFtZSI6IlNpbmdoIiwiYWRkcmVzcyI6bnVsbCwiYWFkaGFhciI6bnVsbCwicGFuIjpudWxsLCJlbWFpbCI6ImhhcnNoc2luZ2guanNAZ21haWwuY29tIiwicGhvbmUiOiI3NjUyMDM1MTUyIiwidXNlclR5cGUiOiJhZG1pbiIsInZlcmlmaWVkIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTEzVDEzOjQzOjExLjE1N1oiLCJpYXQiOjE2ODk0MDM1NjQsImV4cCI6MTcyMDk2MTE2NCwiaXNzIjoiaVRheEVhc3kifQ.Ol-SkcIFpxrLKDjuF3jJqJw6S18zIrcp4ftKDQtq0VM`,
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
  const handleDeleteInvoice = (deletedInvoiceId) => {
       console.log(deletedInvoiceId)
    setInvoices((prevInvoices) =>
      prevInvoices.filter((invoice) => invoice.id !== deletedInvoiceId)
    );
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
      {party ? <PartyDetails party={party}  onDelete={handleDeleteInvoice}/> : <p>Loading...</p>}
    </div>
    </div>
    </div>
    </div>
    
  );
};

export default PartyDetailsPage;
