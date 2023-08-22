import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Topbar from "../../../components/Topbar";
import { BASE_URL } from "../../../constants.js";

const initialFormData = {
  invoiceNumber: null,
  type: "supplier",
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
  items: [{
    itemId: "",
    quantity: null,
    discount: null
  },],
  userId: null,
  credit: null,
  modeOfPayment: "",
};

const InvoiceForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [partyList, setPartyList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [showItemDropdown, setShowItemDropdown] = useState(false);



  const handleItemChange = (index, field, value) => {
    setFormData((prevFormData) => {
      const updatedItems = [...prevFormData.items];
      updatedItems[index][field] = value;
      return { ...prevFormData, items: updatedItems };
    });
  };

  // Use this function to handle changes in quantity for a specific item
  const handleQuantityChange = (event, index) => {
    const { value } = event.target;
    handleItemChange(index, "quantity", parseFloat(value));
  };

  // Use this function to handle changes in discount for a specific item
  const handleDiscountChange = (event, index) => {
    const { value } = event.target;
    handleItemChange(index, "discount", parseFloat(value));
  }


  // Function to fetch all items
  const fetchItems = async () => {
    try {
      let token = JSON.parse(localStorage.getItem("itaxData"))?.token;

      const response = await fetch(`${BASE_URL}/invoice/items`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setItemList(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemsFocus = () => {
    fetchItems();
    setShowItemDropdown(true);
  };

  const handleSelectItem = (item) => {
    // Set the selected item when it's clicked in the dropdown.
    setFormData((prevFormData) => ({
      ...prevFormData,
      items: [{ itemId: item.id }],
    }));
    setShowItemDropdown(false); // Hide the dropdown after selecting the item.
  };

  // Function to fetch all parties
  const fetchParties = async () => {
    try {
      let token = JSON.parse(localStorage.getItem("itaxData"))?.token;

      const response = await fetch(`${BASE_URL}/invoice/parties`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data.parties);
      setPartyList(data.parties);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePartyNameFocus = () => {
    fetchParties();
    setShowDropdown(true);
  };

  const handleSelectParty = (party) => {
    // Set the selected party when it's clicked in the dropdown.
    console.log(party);
    setFormData((prevFormData) => ({
      ...prevFormData,
      partyId: party.id,
      partyName: party.partyName,
      type: party.type,
      phone: party.phone,
      userId: party.userId,
      stateOfSupply: party.address,
    }));
    setShowDropdown(false); // Hide the dropdown after selecting the party.
  };

  // Use useEffect to fetch parties when the component mounts
  useEffect(() => {
    fetchParties();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "credit") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        credit: checked,
      }));
    } else if (name.startsWith("items")) {
      const itemsIndex = parseInt(name.split("_")[1]);
      const updatedItems = [...formData.items];

      if (name.endsWith("itemId")) {
        updatedItems[itemsIndex].itemId = value;
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        items: updatedItems,
      }));
    } else {
      const updatedValue =
        type === "checkbox"
          ? checked
          : type === "number"
          ? parseFloat(value)
          : value;

      setFormData((prevFormData) => ({ ...prevFormData, [name]: updatedValue }));
    }
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
                <div className="mb-4 relative">
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
                    placeholder="+ Add Party"
                    value={formData.partyName}
                    onChange={handleChange}
                    onFocus={handlePartyNameFocus}
                    onBlur={() => setShowDropdown(false)}
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 z-50" // Add z-50 class to make sure the input stays on top
                    required
                  />
                  {showDropdown && partyList.length > 0 && (
                    <ul className="bg-white border border-gray-300 mt-2 rounded shadow-lg absolute z-40 w-full">
                      <p className="bg-blue-300 text white px-4">
                        {" "}
                        Party Name{" "}
                      </p>
                      {partyList.map((party) => (
                        <li
                          key={party.id}
                          onMouseDown={() => handleSelectParty(party)} // Use onMouseDown instead of onClick
                          className="px-4 py-2 cursor-pointer hover:bg-gray-300"
                        >
                          {party.partyName}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

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
                htmlFor="credit"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Credit:
              </label>
              <input
                type="checkbox"
                id="credit"
                name="credit"
                checked={formData.credit}
                onChange={handleChange}
                className="w-6 h-6 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
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

                <div className="mb-4 relative">
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
                    placeholder="+ Add Item"
                    value={formData.items[0].itemId}
                    onChange={handleChange}
                    onFocus={handleItemsFocus}
                    onBlur={() => setShowItemDropdown(false)}
                    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 z-50" // Add z-50 class to make sure the input stays on top
                    required
                  />
                  {showItemDropdown && itemList.length > 0 && (
                    <ul className="bg-white border border-gray-300 mt-2 rounded shadow-lg absolute z-40 w-full">
                      <p className="bg-blue-300 text-white px-4">Item Name</p>
                      {itemList.map((item) => (
                        <li
                          key={item.id}
                          onMouseDown={() => handleSelectItem(item)} // Use onMouseDown instead of onClick
                          className="px-4 py-2 cursor-pointer hover:bg-gray-300"
                          title="Add"
                        >
                          {item.itemName}
                        </li>
                      ))}
                    </ul>
                  )}
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

              {formData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-2 gap-4">
                  <div className="relative mb-4">
                    <label
                      htmlFor={`quantity_${index}`}
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      Quantity:
                    </label>
                    <input
                      type="number"
                      id={`quantity_${index}`}
                      name={`items_${index}_quantity`}
                      value={item.quantity}
                      onChange={(event) => handleQuantityChange(event, index)}
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  {/* Discount Field */}
                  <div className="relative mb-4">
                    <label
                      htmlFor={`discount_${index}`}
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      Discount:
                    </label>
                    <input
                      type="number"
                      id={`discount_${index}`}
                      name={`items_${index}_discount`}
                      value={item.discount}
                      onChange={(event) => handleDiscountChange(event, index)}
                      className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              ))}
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
