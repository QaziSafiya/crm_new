import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import { BASE_URL, MOM_ITAX_URL } from "../../../constants.js";

const PartyForm = () => {
  const [formData, setFormData] = useState({
    partyName: "",
    type: "",
    gstin: "",
    pan: "",
    upi: "",
    email: "",
    phone: "",
    address: "",
    bankName: "",
    bankAccountNumber: "",
    bankIfsc: "",
    bankBranch: "",
  });

  const [fetchData, setFetchData] = useState({});

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Function to fetch GSTIN data
    const fetchGSTINData = async () => {
      try {
        if (formData.gstin) {
          setLoading(true);
          const response = await fetch(
            `${MOM_ITAX_URL}/gsp/search/gstin?gstin=${formData.gstin}`
          );
          const data = await response.json();
          console.log(data.data);
          setFetchData(data.data);
          // Update the form data with the fetched data
          setFormData((prevData) => ({
            ...prevData,
            ...data,
          }));
        }
      } catch (error) {
        console.error(error);
        // Handle error if needed
      } finally {
        setLoading(false);
      }
    };

    // Call the fetchGSTINData function when the GSTIN changes
    fetchGSTINData();
  }, [formData.gstin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rawData = JSON.stringify(formData);
    console.log(formData);
    let token = JSON.parse(localStorage.getItem("itaxData"));
    console.log(token.token);

    // Replace 'your-api-endpoint' with your actual API endpoint
    await fetch(`${BASE_URL}/invoice/parties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: rawData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Do something with the response data if needed
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });
  };

  console.log(fetchData);
  return (
    // ... your existing JSX code
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container w-full">
          <div className="p-8 bg-white rounded shadow-lg">
            <h1 className="text-2xl font-bold text-secondary mb-6">
              Add Parties
            </h1>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="grid grid-cols-2 gap-4">

              <div className="col-span-2 sm:col-span-1">
                  <label
                    className="block text-sm font-bold text-gray-700 mb-2"
                    htmlFor="gstin"
                  >
                    GSTIN No.
                  </label>
                  <input
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    id="gstin"
                    name="gstin"
                    type="text"
                    value={formData.gstin}
                    onChange={handleChange}
                    required
                  />
                  {loading && <div>Loading...</div>}
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    className="block text-sm font-bold text-gray-700 mb-2"
                    htmlFor="partyName"
                  >
                    Party Name
                  </label>
                  <input
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    id="partyName"
                    name="partyName"
                    type="text"
                    value={fetchData.tradeNam}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    className="block text-sm font-bold text-gray-700 mb-2"
                    htmlFor="type"
                  >
                    Type
                  </label>
                  <select
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="supplier">Supplier</option>
                    <option value="customer">Customer</option>
                  </select>
                </div>

               

                <div className="col-span-2 sm:col-span-1">
                  <label
                    className="block text-sm font-bold text-gray-700 mb-2"
                    htmlFor="pan"
                  >
                    PAN
                  </label>
                  <input
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    id="pan"
                    name="pan"
                    type="text"
                    value={formData.pan}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    className="block text-sm font-bold text-gray-700 mb-2"
                    htmlFor="upi"
                  >
                    UPI
                  </label>
                  <input
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    id="upi"
                    name="upi"
                    type="text"
                    value={formData.upi}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    className="block text-sm font-bold text-gray-700 mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    className="block text-sm font-bold text-gray-700 mb-2"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <input
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    id="phone"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
  <label
    className="block text-sm font-bold text-gray-700 mb-2"
    htmlFor="address"
  >
    Address
  </label>
  <input
    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
    id="address"
    name="address"
    type="text"
    value={`${fetchData?.pradr?.addr?.dst || ""}, ${fetchData?.pradr?.addr?.stcd || ""}, ${fetchData?.pradr?.addr?.pncd || ""} `}
    onChange={handleChange}
    required
  />
</div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    className="block text-sm font-bold text-gray-700 mb-2"
                    htmlFor="bankName"
                  >
                    Bank Name
                  </label>
                  <input
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    id="bankName"
                    name="bankName"
                    type="text"
                    value={formData.bankName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    className="block text-sm font-bold text-gray-700 mb-2"
                    htmlFor="bankAccountNumber"
                  >
                    Bank Account Number
                  </label>
                  <input
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    id="bankAccountNumber"
                    name="bankAccountNumber"
                    type="text"
                    value={formData.bankAccountNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    className="block text-sm font-bold text-gray-700 mb-2"
                    htmlFor="bankIfsc"
                  >
                    Bank IFSC No.
                  </label>
                  <input
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    id="bankIfsc"
                    name="bankIfsc"
                    type="text"
                    value={formData.bankIfsc}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    className="block text-sm font-bold text-gray-700 mb-2"
                    htmlFor="bankBranch"
                  >
                    Bank Branch
                  </label>
                  <input
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    id="bankBranch"
                    name="bankBranch"
                    type="text"
                    value={formData.bankBranch}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-center mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    // ... rest of your JSX code
  );
};

export default PartyForm;
