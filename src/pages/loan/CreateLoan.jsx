import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { v4 as uuidv4 } from "uuid";

const CreateLoan = () => {
  const [loanData, setLoanData] = useState({
    type: "",
    name: "",
    shortName: "",
    description: "",
    interest: null,
    documents: [
      {
        id: "doc1",
        name: "Identification Document",
        shortName: "ID Doc",
        mandatory: true,
        type: "pdf",
        description: "Proof of identity",
      },
      {
        id: "doc2",
        name: "Income Proof",
        shortName: "Income Doc",
        mandatory: true,
        type: "pdf",
        description: "Proof of income",
      },
    ],
    maxAmount: 0,
    minAmount: 0,
  });

  // const storedData = JSON.parse(localStorage.getItem('itaxData'));

  const handleLoanDataChange = (e) => {
    const { name, value } = e.target;
    setLoanData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDocumentChange = (index) => {
    const newDocuments = [...loanData.documents];
    newDocuments[index].mandatory = !newDocuments[index].mandatory;
    setLoanData((prevData) => ({ ...prevData, documents: newDocuments }));
  };

  const handleAddDocument = () => {
    setLoanData((prevData) => ({
      ...prevData,
      documents: [
        ...prevData.documents,
        {
          id: `doc${prevData.documents.length + 1}`,
          name: "New Document",
          shortName: "New Doc",
          mandatory: false,
          type: "pdf",
          description: "New document description",
        },
      ],
    }));
  };

  const handleRemoveDocument = (index) => {
    const newDocuments = [...loanData.documents];
    newDocuments.splice(index, 1);
    setLoanData((prevData) => ({ ...prevData, documents: newDocuments }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("itaxData")).token;

    try {
      const response = await fetch("https://api.itaxeasy.com/loan/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...loanData,
          maxAmount: parseFloat(loanData.maxAmount),
          minAmount: parseFloat(loanData.minAmount),
          interest: parseFloat(loanData.interest),
        }),
      });

      if (response.ok) {
        console.log("Loan created successfully");
        setLoanData({
          type: "",
          name: "",
          shortName: "",
          description: "",
          interest: null,
          documents: [],
          maxAmount: 0,
          minAmount: 0,
        });
      }
    } catch (error) {
      console.error("Failed to fetch API", error);
    }
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          <h6 className="text-blue-900 ml-4">Loan Creation Form</h6>
          <form
            onSubmit={handleSubmit}
            className="p-4 rounded-lg shadow-lg border border-gray-300"
          >
            {/* Loan Type */}
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block mb-2 text-primary font-bold"
              >
                Loan Type
              </label>
              <select
                id="type"
                name="type"
                value={loanData.type}
                onChange={handleLoanDataChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white h-12"
              >
                <option value="">Select Loan Type</option>
                <option value="personal">Personal Loan</option>
                {/* Add other loan types here */}
              </select>
            </div>

            {/* Applicant Name */}
            <div className="mb-4">
              <label className="block mb-2 text-primary font-bold">Name</label>
              <input
                type="text"
                name="name"
                value={loanData.name}
                onChange={handleLoanDataChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
         
            <div className="flex justify-between gap-10">
            {/* Short Name */}
            <div className="mb-4 w-1/2">
              <label className="block mb-2 text-primary font-bold">
                Short Name
              </label>
              <input
                type="text"
                name="shortName"
                value={loanData.shortName}
                onChange={handleLoanDataChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

             {/* Interest Rate */}
             <div className="mb-4 w-1/2">
              <label className="block mb-2 text-primary font-bold">
                Interest Rate
              </label>
              <input
                type="number"
                name="interest"
                value={loanData.interest}
                onChange={handleLoanDataChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            </div>

            <div className="flex justify-between gap-10">
              {/* Max Amount */}
              <div className="mb-4 w-1/2">
                <label className="block mb-2 text-primary font-bold">
                  Max Amount
                </label>
                <input
                  type="number"
                  name="maxAmount"
                  value={loanData.maxAmount}
                  onChange={handleLoanDataChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Min Amount */}
              <div className="mb-4 w-1/2">
                <label className="block mb-2 text-primary font-bold">
                  Min Amount
                </label>
                <input
                  type="number"
                  name="minAmount"
                  value={loanData.minAmount}
                  onChange={handleLoanDataChange}
                  className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

           

            {/* Description */}
            <div className="mb-4">
              <label className="block mb-2 text-primary font-bold">
                Description
              </label>
              <textarea
                name="description"
                value={loanData.description}
                onChange={handleLoanDataChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Documents */}
            <h6 className="text-blue-900 mt-6">Documents</h6>
            {loanData.documents.map((document, index) => (
              <div key={document.id} className="mb-4">
                <label className="block mb-2 text-primary font-bold">
                  {document.name}
                </label>
                <input
                  type="checkbox"
                  onChange={() => handleDocumentChange(index)}
                  className="mt-1"
                />
                {/* Add additional document-related fields here */}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddDocument}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Document
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-5"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLoan;
