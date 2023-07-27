import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { BASE_URL } from "../../constants";
import PartyList from "./Lists/PartyList";

// const ENDPOINT = `https://mom.itaxeasy.com/api/gsp/search/gstin`;

export default function AddParty() {
  const [showForm, setShowForm] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
        'Content-Type': 'application/json',
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

  const handleAddPartyClick = () => {
    setShowForm(true);
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container w-full">
          <div className="flex justify-between item-center pt-4">
        { !showForm && (<h6 className="text-secondary font-bold">Add New Party</h6>)}
        <div className="grid justify-items-end mb-0 p-4">
          {!showForm && (
            <button
              onClick={handleAddPartyClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-40 "
            >
              Add Party
            </button>
          )}
         </div>
         </div>
          <div className="flex items-center justify-center mt-1">
            {!showForm && <PartyList />}
          </div>
          {showForm && (
            <>
              <h1 className="text-secondary font-bold">Add Parties</h1>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      className="block text-sm font-bold text-gray-700 mb-2"
                      htmlFor="partyName"
                    >
                      Party Name
                    </label>
                    <input
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg"
                      id="partyName"
                      name="partyName"
                      type="text"
                      value={formData.partyName}
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
                    <input
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg"
                      id="type"
                      name="type"
                      type="text"
                      value={formData.type}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      className="block text-sm font-bold text-gray-700 mb-2"
                      htmlFor="gstin"
                    >
                      GSTIN No.
                    </label>
                    <input
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg"
                      id="gstin"
                      name="gstin"
                      type="text"
                      value={formData.gstin}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      className="block text-sm font-bold text-gray-700 mb-2"
                      htmlFor="pan"
                    >
                      PAN
                    </label>
                    <input
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg"
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
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg"
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
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg"
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
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg"
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
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg"
                      id="address"
                      name="address"
                      type="text"
                      value={formData.address}
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
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg"
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
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg"
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
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg"
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
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg"
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
