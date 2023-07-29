import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import { BASE_URL } from "../../../constants.js";

const initialFormData = {
  invoiceNumber: null,
  type: "",
  partyId: "",
  phone: "",
  partyName: "",
  totalAmount: null,
  totalGst: null,
  stateOfSupply: "",
  cgst: null,
  sgst: null,
  igst: null,
  utgst: null,
  details: "",
  extraDetails: "",
  items: [{ itemId: "" }],
  userId: null,
};

const InvoiceForm = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const updatedValue =
      type === "checkbox"
        ? checked
        : type === "number"
        ? parseFloat(value)
        : name === "items" // Handle the special case for items
        ? [{ itemId: value }] // Convert the value to an array of object with itemId property
        : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: updatedValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const rawData = JSON.stringify(formData);
    console.log(formData);

    let token = JSON.parse(localStorage.getItem("itaxData"));
    console.log(token.token);

    await fetch(`${BASE_URL}/invoice/invoices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.token}`,
      },
      body: rawData,
    })
      .then((response) => {
        response.json();
        console.log(response);
      })
      .then((data) => {
        console.log(data);
        // Do something with the response data if needed
      })
      .catch((error) => {
        console.error(error);
        // Handle error if needed
      });

    // setFormData({
    //   invoiceNumber: null,
    //   type: "",
    //   partyId: "",
    //   phone: "",
    //   partyName: "",
    //   totalAmount: null,
    //   totalGst: null,
    //   stateOfSupply: "",
    //   cgst: null,
    //   sgst: null,
    //   igst: null,
    //   utgst: null,
    //   details: "",
    //   extraDetails: "",
    //   items: [{ itemId: "" }],
    //   userId: null,
    // });
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          <div className="p-8 bg-white rounded shadow-lg">
            <h2 className="text-2xl font-bold text-secondary mb-6">
              Invoice Form
            </h2>
            <form onSubmit={handleSubmit} className="w-full">
              {/* Form fields go here */}
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-4">
                  <label
                    htmlFor="invoiceNumber"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    Invoice Number:
                  </label>
                  <input
                    type="number"
                    id="invoiceNumber"
                    name="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
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
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    type="text"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="partyId"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    Party Id:
                  </label>
                  <input
                    type="text"
                    id="partyId"
                    name="partyId"
                    value={formData.partyId}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    Phone:
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="partyName"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    Party Name:
                  </label>
                  <input
                    type="text"
                    id="partyName"
                    name="partyName"
                    value={formData.partyName}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="totalAmount"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    Total Amount:
                  </label>
                  <input
                    type="number"
                    id="totalAmount"
                    name="totalAmount"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="totalGst"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    Total Gst:
                  </label>
                  <input
                    type="number"
                    id="totalGst"
                    name="totalGst"
                    value={formData.totalGst}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="stateOfSupply"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    State Of Supply:
                  </label>
                  <input
                    type="text"
                    id="stateOfSupply"
                    name="stateOfSupply"
                    value={formData.stateOfSupply}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="cgst"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    CGST:
                  </label>
                  <input
                    type="number"
                    id="cgst"
                    name="cgst"
                    value={formData.cgst}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="sgst"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    SGST:
                  </label>
                  <input
                    type="number"
                    id="sgst"
                    name="sgst"
                    value={formData.sgst}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="igst"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    IGST:
                  </label>
                  <input
                    type="number"
                    id="igst"
                    name="igst"
                    value={formData.igst}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="utgst"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    UTGST:
                  </label>
                  <input
                    type="number"
                    id="utgst"
                    name="utgst"
                    value={formData.utgst}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="details"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    Details:
                  </label>
                  <input
                    type="text"
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="extraDetails"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    Extra Details:
                  </label>
                  <input
                    type="text"
                    id="extraDetails"
                    name="extraDetails"
                    value={formData.extraDetails}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="items"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    Items:
                  </label>
                  <input
                    type="text"
                    id="items"
                    name="items"
                    value={formData.items[0].itemId}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="userId"
                    className="block text-sm font-bold text-gray-700 mb-2"
                  >
                    User Id:
                  </label>
                  <input
                    type="number"
                    id="userId"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                {/* ... other form fields ... */}
              </div>
              <div className="flex items-center justify-center mt-4 ">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
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

export default InvoiceForm;
