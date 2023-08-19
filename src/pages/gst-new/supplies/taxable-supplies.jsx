import React, { useState } from 'react';
import Topbar from '../../../components/Topbar';
import Sidebar from '../../../components/Sidebar';

const TaxableSuppliesForm = () => {
  const [formData, setFormData] = useState({
    serialNumber: '',
    gstinNumber: '',
    partyName: '',
    pointOfSale: '',
    taxableValue: '',
    cgst: '',
    igst: '',
    sgst: '',
    utgst: '',
    cess: '',
    date: '',
    invoiceNumber: '',
  });

  const isValidGSTIN = (gstin) => {
    // GSTIN should be a 15-digit alphanumeric code
    const gstinPattern = /^[0-9A-HJ-NP-Z]{15}$/;
    return gstinPattern.test(gstin);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValidGSTIN(formData.gstinNumber)) {
        alert('Invalid GSTIN format');
        return;
      }
    // Handle form submission here
    console.log(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.toUpperCase(), // Convert to uppercase
    }));
  };

  return (
    <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
    <div className="pl-5 pr-5">
      <h2 className="text-secondary ml-5 mb-5">Taxable Supplies Form</h2>
      <form onSubmit={handleSubmit}
     
      >
      <div className="grid grid-cols-3 gap-4 pl-5 pr-5 bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label  className="block mb-2 text-primary font-bold">Serial Number</label>
          <input
            type="text"
            name="serialNumber"
            value={formData.serialNumber}
            onChange={handleChange}
            className="border-2 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 "
          />
        </div>
        <div className="mb-4">
                  <label className="block mb-2 text-primary font-bold">GSTIN Number</label>
                  <input
                    type="text"
                    name="gstinNumber"
                    value={formData.gstinNumber}
                    onChange={handleChange}
                    className={`border-2 rounded w-full py-2 px-3 ${
                      formData.gstinNumber && !isValidGSTIN(formData.gstinNumber)
                        ? 'border-red-500 focus:border-red-500 focus:ring focus:ring-red-200'
                        : isValidGSTIN(formData.gstinNumber)
                        ? 'border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200'
                        : ''
                    }`}
                  />
                  {!isValidGSTIN(formData.gstinNumber) && formData.gstinNumber && (
                    <p className="text-red-500 mt-1">Invalid GSTIN format</p>
                  )}
                </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Party Name</label>
          <input
            type="text"
            name="partyName"
            value={formData.partyName}
            onChange={handleChange}
            className="border-2 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Point of Sale</label>
          <input
            type="text"
            name="pointOfSale"
            value={formData.pointOfSale}
            onChange={handleChange}
            className="border-2 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Taxable Value</label>
          <input
            type="text"
            name="taxableValue"
            value={formData.taxableValue}
            onChange={handleChange}
            className="border-2 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">CGST</label>
          <input
            type="text"
            name="cgst"
            value={formData.cgst}
            onChange={handleChange}
            className="border-2 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">IGST</label>
          <input
            type="text"
            name="igst"
            value={formData.igst}
            onChange={handleChange}
            className="border-2 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">SGST</label>
          <input
            type="text"
            name="sgst"
            value={formData.sgst}
            onChange={handleChange}
            className="border-2 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">UTGST</label>
          <input
            type="text"
            name="utgst"
            value={formData.utgst}
            onChange={handleChange}
            className="border-2 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">CESS</label>
          <input
            type="text"
            name="cess"
            value={formData.cess}
            onChange={handleChange}
            className="border-2 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border-2 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Invoice Number</label>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            className="border-2 rounded w-full py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
        </div>
      </form>
    </div>
    </div>
    </div>
    </div>
  );
};

export default TaxableSuppliesForm;
