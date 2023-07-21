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
    documents: [
      {
        id: "doc1",
        name: "Identification Document",
        shortName: "ID Doc",
        mandatory: true,
        type: "pdf",
        description: "Proof of identity",
        isChecked: false,
        file: null,
      },
      {
        id: "doc2",
        name: "Income Proof",
        shortName: "Income Doc",
        mandatory: true,
        type: "pdf",
        description: "Proof of income",
        isChecked: false,
        file: null,
      },
    ],
    maxAmount: 0,
    minAmount: 0,
  });

const storedData = JSON.parse(localStorage.getItem('itaxData'));


  const handleLoanDataChange = (e) => {
    const { name, value } = e.target;
    setLoanData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDocumentChange = (index) => {
    const newDocuments = [...loanData.documents];
    newDocuments[index].isChecked = !newDocuments[index].isChecked;
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
          isChecked: false,
          file: null,
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
    console.log(loanData);
    const uniqueId = uuidv4();
    // console.log(storedData.token)

    try {
      // Perform your API call or form submission logic here
      const response = await fetch("https://api.itaxeasy.com/loan/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedData.token}`,
        },
        body: JSON.stringify(loanData),
      });
      console.log(response);

      if (response.ok) {
        // Handle success
        console.log("Loan created successfully");
        console.log(response);

        // Reset the form
        setLoanData({
          type: "",
          name: "",
          shortName: "",
          description: "",
          documents: [
            {
              id: "doc1",
              name: "Identification Document",
              shortName: "ID Doc",
              mandatory: true,
              type: "pdf",
              description: "Proof of identity",
              isChecked: false,
              file: null,
            },
            {
              id: "doc2",
              name: "Income Proof",
              shortName: "Income Doc",
              mandatory: true,
              type: "pdf",
              description: "Proof of income",
              isChecked: false,
              file: null,
            },
          ],
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
            {/* ... Rest of the form code ... */}
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
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Loan Type</option>
                <option value="business">Business Loan</option>
                <option value="car">Car Loan</option>
                <option value="personal">Personal Loan</option>
                <option value="home">Home Loan</option>
                <option value="property">Loan against Property</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-primary font-bold">
                Applicant Name
              </label>
              <input
                type="text"
                name="name"
                value={loanData.name}
                onChange={handleLoanDataChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
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
            <div className="mb-4">
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
            <div className="mb-4">
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
            <h6 className="text-blue-900 mt-6">Documents</h6>
            {loanData.documents.map((document, index) => (
              <div key={document.id} className="mb-4">
                <label className="block mb-2 text-primary font-bold">
                  {document.name}
                </label>
                <input
                  type="checkbox"
                  checked={document.isChecked}
                  onChange={() => handleDocumentChange(index)}
                  className="mt-1"
                />
                {document.mandatory ? null : (
                  <button
                    type="button"
                    onClick={() => handleRemoveDocument(index)}
                    className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Remove
                  </button>
                )}
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
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
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
