import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../constants';
import axios from 'axios';

const ApplyLoan = ({ formData }) => {
  const storedUploadedFileIds = JSON.parse(localStorage.getItem("uploadedFileIds"))
  const [loanData, setLoanData] = useState({
    
    loanId: '',
    amount:null,
    loanType:"",
    description: '',
    documents: [...storedUploadedFileIds],
    applicantDetails: {
      applicantName:"",
      applicantAge: null,
      applicantGender: '',
      nationality: '',
      salaried: true,
      phone: "",
      email: '',
      permanentAddress: '',
      country: '',
      address: '',
      bankDetails: {
        accountHolderName: '',
        bankName: '',
        bankAccountNo: '',
        bankAccountType: '',
        bankIfsc: '',
        bankBranch: '',
      },
    },
  });


const storedData = JSON.parse(localStorage.getItem('itaxData'));
// console.log(storedData.token)

const handleLoanDataChange = (e) => {
  const { name, value, type } = e.target;

  // Parse value as a number if the input type is "number"
  const parsedValue = type === "number" ? parseFloat(value) : value;

  setLoanData((prevData) => ({
    ...prevData,
    [name]: parsedValue,
  }));
};

const handleApplicantDetailsChange = (e) => {
  const { name, value, type, checked } = e.target;

  // Convert the string value to a boolean if the input type is a checkbox
  const newValue = type === 'checkbox' ? checked : (type === 'number' ? parseFloat(value) : value);

  setLoanData((prevData) => ({
    ...prevData,
    applicantDetails: {
      ...prevData.applicantDetails,
      [name]: name === 'salaried' ? (newValue === 'true') : newValue,
    },
  }));
};

  
  

  const handleDocumentsChange = (event) => {
    const newDocuments = event.target.value.split(','); // Assuming documents are separated by commas
    setLoanData((prevLoanData) => ({
      ...prevLoanData,
      documents: newDocuments,
    }));
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setLoanData((prevData) => ({
      ...prevData,
      applicantDetails: {
        ...prevData.applicantDetails,
        bankDetails: {
          ...prevData.applicantDetails.bankDetails,
          [name]: value,
        },
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    console.log(loanData)
    console.log(storedData.token)
    try {
      const response = await axios.post(
        `${BASE_URL}/loan/applications`,
        loanData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${storedData.token}`,
          },
        });

      // console.log(response)

      if (response.ok) {
        // Handle success
        console.log('Loan application submitted successfully');
       
        // Reset the form
        setLoanData({
         
          loanId: '',
          amount: null,
         
          description: '',
          documents: [],
          loanType:"",
          applicantDetails: {
            applicantName:"",
            applicantAge: null,
            applicantGender: '',
            nationality: '',
            salaried: false,
            phone: '',
            email: '',
            permanentAddress: '',
            country: '',
            address: '',
            bankDetails: {
              accountHolderName: '',
              bankName: '',
              bankAccountNo: '',
              bankAccountType: '',
              bankIfsc: '',
              bankBranch: '',
            },
          },
        });
      } else {
        // Handle error
        console.error('Failed to submit loan application');
      }
    } catch (error) {
      console.error('Failed to fetch API', error);
    }
  };
  // const loanId =  JSON.parse(localStorage.getItem('loanId'));
  
  useEffect(() => {
    // Retrieve loanId from localStorage
    const storedLoanId = JSON.parse(localStorage.getItem('loanId'));

    // Update loanId in loanData state
    setLoanData(prevLoanData => ({
      ...prevLoanData,
      loanId: storedLoanId,
    }));
  }, []); 
  
  return (
    <div >
      <h6 className="text-blue-900 ml-4">Loan Application</h6>
      <form onSubmit={handleSubmit} className="p-4">
       
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold ">Loan ID</label>
          <input
            type="text"
            name="loanId"
            value={loanData.loanId}
            onChange={handleLoanDataChange}
            className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Loan Amount</label>
          <input
            type="number"
            name="amount"
            value={loanData.amount}
            onChange={handleLoanDataChange}
            className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
  <label className="block mb-2 text-primary font-bold">Loan Type</label>
  <select
    name="loanType"
    value={loanData.loanType}
    onChange={handleLoanDataChange}
    className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline h-10 bg-white"
  >
    <option value="">Select Loan Type</option>

    <option value="personal">Personal</option>
    <option value="education">Education</option>
    <option value="home">Home</option>
    <option value="business">Business</option>
    <option value="car">Car</option>
    <option value="property">Property</option>
  </select>
</div>

       
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Loan Description</label>
          <input
            type="text"
            name="description"
            value={loanData.description}
            onChange={handleLoanDataChange}
            className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
          />
        </div>
  <div className="mb-4">
  <label className="block mb-2 text-primary font-bold">Documents</label>
  <input
    type="text"
    name="documents"
    value={loanData.documents.join(', ')} // Join array elements with commas and spaces
    onChange={handleDocumentsChange}
    className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
    placeholder="Document 1, Document 2, ..."
  />
</div>

<div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Applicant Name</label>
          <input
            type="text"
            name="applicantName"
            value={loanData.applicantDetails.applicantName}
            onChange={handleApplicantDetailsChange}
            className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Applicant Age</label>
          <input
            type="number"
            name="applicantAge"
            value={loanData.applicantDetails.applicantAge}
            onChange={handleApplicantDetailsChange}
            className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
  <label className="block mb-2 text-primary font-bold">Applicant Gender</label>
  <select
    name="applicantGender"
    value={loanData.applicantDetails.applicantGender}
    onChange={handleApplicantDetailsChange}
    className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline bg-white"
  >
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</div>

<div className="mb-4">
  <label className="block mb-2 text-primary font-bold">Nationality</label>
  <select
    name="nationality"
    value={loanData.applicantDetails.nationality}
    onChange={handleApplicantDetailsChange}
    className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline bg-white h-10"
  >
    <option value="">Select Nationality</option>
    <option value="resident">Resident</option>
    <option value="nri">NRI</option>
    <option value="foreign">Foreign</option>
  </select>
</div>

        <div className="mb-4">
  <label className="block mb-2 text-primary font-bold">Salaried</label>
  <input
    type="checkbox"
    name="salaried"
    checked={loanData.applicantDetails.salaried}
    onChange={handleApplicantDetailsChange}
    className="mt-1"
    value={loanData.applicantDetails.salaried} // Add this line
  />
</div>


        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Phone</label>
          <input
            type="text"
            name="phone"
            value={loanData.applicantDetails.phone}
            onChange={handleApplicantDetailsChange}
            className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={loanData.applicantDetails.email}
            onChange={handleApplicantDetailsChange}
            className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Permanent Address</label>
          <input
            type="text"
            name="permanentAddress"
            value={loanData.applicantDetails.permanentAddress}
            onChange={handleApplicantDetailsChange}
            className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Country</label>
          <input
            type="text"
            name="country"
            value={loanData.applicantDetails.country}
            onChange={handleApplicantDetailsChange}
            className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Address</label>
          <input
            type="text"
            name="address"
            value={loanData.applicantDetails.address}
            onChange={handleApplicantDetailsChange}
            className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Account Holder Name</label>
          <input
            type="text"
            name="accountHolderName"
            value={loanData.applicantDetails.bankDetails.accountHolderName}
            onChange={handleBankDetailsChange}
            className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Bank Name</label>
          <input
            type="text"
            name="bankName"
            value={loanData.applicantDetails.bankDetails.bankName}
            onChange={handleBankDetailsChange}
            className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Bank Account No.</label>
          <input
            type="text"
            name="bankAccountNo"
            value={loanData.applicantDetails.bankDetails.bankAccountNo}
            onChange={handleBankDetailsChange}
            className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
  <label className="block mb-2 text-primary font-bold">Bank Account Type</label>
  <select
    name="bankAccountType"
    value={loanData.applicantDetails.bankDetails.bankAccountType}
    onChange={handleBankDetailsChange}
    className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline bg-white h-10"
  >
    <option value="">Select Account Type</option>
    <option value="savings">Savings</option>
    <option value="current">Current</option>
    <option value="nri">NRI</option>
    <option value="fcnr">FCNR</option>
    <option value="rd">RD</option>
    <option value="fd">FD</option>
    <option value="salary">Salary</option>
  </select>
</div>

        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Bank IFSC</label>
          <input
            type="text"
            name="bankIfsc"
            value={loanData.applicantDetails.bankDetails.bankIfsc}
            onChange={handleBankDetailsChange}
            className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Bank Branch</label>
          <input
            type="text"
            name="bankBranch"
            value={loanData.applicantDetails.bankDetails.bankBranch}
            onChange={handleBankDetailsChange}
            className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplyLoan;
