import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { BASE_URL } from "../../constants.js";
import axios from "axios";
import ItemList from "./Lists/ItemList";

const initialFormData = {
  itemName: "",
  unit: "",
  price: null,
  openingStock: null,
  closingStock: null,
  purchasePrice: null,
  cgst: null,
  sgst: null,
  igst: null,
  utgst: null,
  taxExempted: null,
  description: "",
  hsnCode: "",
  userId: null,
};

export default function AddItem() {
  const [formData, setFormData] = useState(initialFormData);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const updatedValue =
      type === "checkbox"
        ? checked
        : type === "number"
        ? parseFloat(value)
        : value;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: updatedValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const rawData = JSON.stringify(formData);
    console.log(formData);
    // console.log(formData); // Check the form data in the console before making the API request
    let token = JSON.parse(localStorage.getItem("itaxData"));
    console.log(token.token);

    // Make the API POST request

    await fetch(`${BASE_URL}/invoice/items`, {
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
            {!showForm && (
              <h6 className="text-secondary font-bold">Add New Item</h6>
            )}
            <div className="grid justify-items-end mb-0 p-4">
              {!showForm && (
                <button
                  onClick={handleAddPartyClick}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-40 "
                >
                  Add Item
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mt-1">
            {!showForm && <ItemList />}
          </div>

          {showForm && (
            <div className="p-8 bg-white rounded shadow-lg">
              <h1 className="text-2xl font-bold text-secondary mb-6">Add Items</h1>
              <form onSubmit={handleSubmit} className="w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      className="block text-sm font-bold text-gray-700 mb-2"
                      htmlFor="itemName"
                    >
                      Item Name
                    </label>
                    <input
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                      id="itemName"
                      name="itemName"
                      type="text"
                      value={formData.itemName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      className="block text-sm font-bold text-gray-700 mb-2"
                      htmlFor="unit"
                    >
                      Unit
                    </label>
                    <input
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                      id="unit"
                      name="unit"
                      type="text"
                      value={formData.unit}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      className="block text-sm font-bold text-gray-700 mb-2"
                      htmlFor="price"
                    >
                      Price
                    </label>
                    <input
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                      id="price"
                      name="price"
                      type="number"
                      value={Number(formData.price)}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      className="block text-sm font-bold text-gray-700 mb-2"
                      htmlFor="openingStock"
                    >
                      Opening Stock
                    </label>
                    <input
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                      id="openingStock"
                      name="openingStock"
                      type="number"
                      value={formData.openingStock}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      className="block text-sm font-bold text-gray-700 mb-2"
                      htmlFor="closingStock"
                    >
                      Closing Stock
                    </label>
                    <input
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                      id="closingStock"
                      name="closingStock"
                      type="number"
                      value={formData.closingStock}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      className="block text-sm font-bold text-gray-700 mb-2"
                      htmlFor="purchasePrice"
                    >
                      Purchase Price
                    </label>
                    <input
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                      id="purchasePrice"
                      name="purchasePrice"
                      type="number"
                      value={formData.purchasePrice}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      className="block text-sm font-bold text-gray-700 mb-2"
                      htmlFor="cgst"
                    >
                      CGST
                    </label>
                    <input
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                      id="cgst"
                      name="cgst"
                      type="number"
                      value={formData.cgst}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      className="block text-sm font-bold text-gray-700 mb-2"
                      htmlFor="sgst"
                    >
                      SGST
                    </label>
                    <input
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                      id="sgst"
                      name="sgst"
                      type="number"
                      value={formData.sgst}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      className="block text-sm font-bold text-gray-700 mb-2"
                      htmlFor="igst"
                    >
                      IGST
                    </label>
                    <input
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                      id="igst"
                      name="igst"
                      type="number"
                      value={formData.igst}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      className="block text-sm font-bold text-gray-700 mb-2"
                      htmlFor="utgst"
                    >
                      UTGST
                    </label>
                    <input
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                      id="utgst"
                      name="utgst"
                      type="number"
                      value={formData.utgst}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      className="block text-sm font-bold text-gray-700 mb-2"
                      htmlFor="taxExempted"
                    >
                      Tax Exempted
                    </label>
                    <div className="flex gap-5">
                      <div>Check if True</div>
                      <input
                        className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                        id="taxExempted"
                        name="taxExempted"
                        type="checkbox"
                        value={formData.taxExempted}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      className="block text-sm font-bold text-gray-700 mb-2"
                      htmlFor="description"
                    >
                      Description
                    </label>
                    <input
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                      id="description"
                      name="description"
                      type="text"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      className="block text-sm font-bold text-gray-700 mb-2"
                      htmlFor="hsnCode"
                    >
                      Hsn Code
                    </label>
                    <input
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                      id="hsnCode"
                      name="hsnCode"
                      type="text"
                      value={formData.hsnCode}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label
                      className="block text-sm font-bold text-gray-700 mb-2"
                      htmlFor="userId"
                    >
                      User Id
                    </label>
                    <input
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                      id="userId"
                      name="userId"
                      type="number"
                      value={formData.userId}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {/* Add more form fields here using the same pattern */}
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
          )}
        </div>
      </div>
    </div>
  );
}
