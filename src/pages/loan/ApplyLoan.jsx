import React, { useState } from 'react';

const ApplyLoan = ({ formData }) => {
  
  const [loanData, setLoanData] = useState({
    id:'',
    loanId: '',
    amount: '',
    loanStatus:'',
    description: '',
    documents: [],
    applicantDetails: {
      applicantAge: '',
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

const storedData = JSON.parse(localStorage.getItem('itaxData'));
// console.log(storedData.token)

  const handleLoanDataChange = (e) => {
    const { name, value } = e.target;
    setLoanData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleApplicantDetailsChange = (e) => {
    const { name, value } = e.target;
    setLoanData((prevData) => ({
      ...prevData,
      applicantDetails: {
        ...prevData.applicantDetails,
        [name]: value,
      },
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
    e.preventDefault(loanData);
   
    console.log(loanData)
    try {
      const response = await fetch('https://api.itaxeasy.com/loan/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedData.token}`,
        },
        body: JSON.stringify(loanData),
      });

      console.log(response)

      if (response.ok) {
        // Handle success
        console.log('Loan application submitted successfully');
       
        // Reset the form
        setLoanData({
          id:'',
          loanId: '',
          amount: '',
          loanStatus:'',
          description: '',
          documents: [],
          applicantDetails: {
            applicantAge: '',
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

  return (
    <div >
      <h6 className="text-blue-900 ml-4">Loan Application</h6>
      <form onSubmit={handleSubmit} className="p-4">
       
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold ">Loan ID</label>
          <input
            type="text"
            name="loanId"
            value={formData.id}
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
          <input
            type="text"
            name="nationality"
            value={loanData.applicantDetails.nationality}
            onChange={handleApplicantDetailsChange}
            className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-primary font-bold">Salaried</label>
          <input
            type="checkbox"
            name="salaried"
            checked={loanData.applicantDetails.salaried}
            onChange={handleApplicantDetailsChange}
            className="mt-1"
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
            type="text"
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
          <input
            type="text"
            name="bankAccountType"
            value={loanData.applicantDetails.bankDetails.bankAccountType}
            onChange={handleBankDetailsChange}
            className="block w-full p-2 text-base border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-primary focus:shadow-outline"
          />
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
