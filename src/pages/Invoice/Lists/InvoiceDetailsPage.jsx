import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {BASE_URL} from "../../../constants.js";
import InvoiceDetails from './InvoiceDetails.jsx';
import Sidebar from '../../../components/Sidebar.jsx';
import Topbar from '../../../components/Topbar.jsx';

const InvoiceDetailsPage = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  const getInvoiceById = async () => {
    try {
      let token = JSON.parse(localStorage.getItem("itaxData"));
      console.log(token.token);

      const response = await fetch(`${BASE_URL}/invoice/invoices/${id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setInvoice(data);
      } else {
        console.error('Failed to fetch invoice by ID');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInvoiceById();
  }, [id]);

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container w-full">
    <div className="container mx-auto p-4">
      {invoice ? <InvoiceDetails invoice={invoice} /> : <p>Loading...</p>}
    </div>
    </div>
    </div>
    </div>
  );
};

export default InvoiceDetailsPage;
