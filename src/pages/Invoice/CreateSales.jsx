import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { BASE_URL } from "../../constants.js";
import ItemDropdown from "./dropdowns/ItemDropdown";

const initialFormData = {
  invoiceNumber: null,
  type: "Customer",
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
  purchaseDate: "",
  modeOfPayment: "",
};

const CreateSales = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [partyList, setPartyList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [showItemDropdown, setShowItemDropdown] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

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
    // Update the formData with the selected item's itemId
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
    const updatedValue =
      type === "checkbox"
        ? checked
        : type === "number"
        ? parseFloat(value)
        : name === "items" // Handle the special case for items
        ? [{ itemId: value }] // Convert the value to an array of objects with itemId property
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

  const handleAddItem = () => {
    setItemList((items) => [
      ...items,
      {
        entryId: null,
        id: null,
        itemName: "",
        price: 0,
        quantity: 0,
        discount: 0,
        gst: 0,
        unit: "",
        hsnCode: "",
      },
    ]);
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          <div className="p-8 bg-white rounded shadow-lg">
            <h2 className="text-2xl font-bold text-secondary mb-6">
              Create Sale
            </h2>
            <form onSubmit={handleSubmit} className="w-full">
              {/* Form fields go here */}
              <div className="">
                {/* Party Details  */}
                <div className="flex justify-between gap-5">
                  <div className="w-1/2 border-2 p-5">
                    <p>Party Details</p>

                    <div className="col-span-2 sm:col-span-1 mt-5 mb-2">
                      <p>{formData.type}</p>
                    </div>

                    <div className="mb-5 relative">
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
                    <div className="mb-5">
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

                    <div className="mb-5">
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
                    <div className="mb-5">
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
                    <div className="mb-5">
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
                  </div>

                  {/* purchase details */}
                  <div className="w-1/2 border-2 p-5 ">
                    <p>Purchase Details</p>

                    <div className="mb-6 mt-12">
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
                    <div className="mb-6">
                      <label
                        htmlFor="purchaseDate"
                        className="block text-sm font-bold text-gray-700 mb-2"
                      >
                        Purchase Date:
                      </label>
                      <input
                        type="date"
                        id="purchaseDate"
                        name="purchaseDate"
                        value={formData.purchaseDate}
                        onChange={handleChange}
                        className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="modeOfPayment"
                        className="block text-sm font-bold text-gray-700 mb-2"
                      >
                        Mode of Payment:
                      </label>
                      <select
                        id="modeOfPayment"
                        name="modeOfPayment"
                        value={formData.modeOfPayment}
                        onChange={handleChange}
                        className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 bg-white h-10"
                        required
                      >
                        <option value="">Select Mode of Payment</option>
                        <option value="cash">Cash</option>
                        <option value="bank">Bank</option>
                      </select>
                    </div>

                    <div className="mb-5">
  <label
    htmlFor="stateOfSupply"
    className="block text-sm font-bold text-gray-700 mb-2"
  >
    State Of Supply:
  </label>
  <select
    id="stateOfSupply"
    name="stateOfSupply"
    value={formData.stateOfSupply}
    onChange={handleChange}
    className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 bg-white h-10"
    required
  >
    <option value="">Select State</option>
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
    <option value="Andaman and Nicobar Islands">
      Andaman and Nicobar Islands
    </option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Dadra and Nagar Haveli and Daman and Diu">
      Dadra and Nagar Haveli and Daman and Diu
    </option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Delhi">Delhi</option>
    <option value="Puducherry">Puducherry</option>
  </select>
</div>


                    <div className="mb-5">
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
                  </div>
                </div>

                {/* item Details */}

                <div className="border-2 p-5 mt-5">
                  <div direction="col" full>
                    <h3 className="text-lg p-4">Items</h3>
                    {!itemList.length ? (
                      <span className="text-gray-700 px-4">
                        No items added.
                      </span>
                    ) : (
                      <table>
                        <thead>
                          <tr className="bg-slate-200">
                            <th className="p-2">Item</th>
                            <th className="p-2">Price/Unit</th>
                            <th className="p-2">Qty</th>
                            <th className="p-2">Discount %</th>
                            <th className="whitespace-nowrap p-2">GST %</th>
                            <th className="p-2">Total</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {itemList.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="p-4">
                                  <div className="mb-5 relative">
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
                                      value={fetchItems.itemName}
                                      //   onFocus={handleItemsFocus}
                                      //   onBlur={() => setShowItemDropdown(false)}
                                      className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 z-50"
                                      required
                                    />
                                  </div>
                                </td>
                                <td className="p-4">{item.price}</td>
                                <td className="p-4">
                                  {/* <TextField 
                                                                    disabled={!item.id} 
                                                                    value={item.quantity} 
                                                                    onChange={e => setItemProperty(item.entryId, 'quantity', e.target.value)} 
                                                                /> */}
                                  0
                                </td>
                                <td className="p-4">
                                  {/* <TextField 
                                                                    symbol="%"
                                                                    disabled={!item.id} 
                                                                    value={item.discount} 
                                                                    onChange={e => setItemProperty(item.entryId, 'discount', e.target.value)}
                                                                /> */}
                                  0
                                </td>
                                <td className="p-4">{item.gst || "-"}</td>
                                {/* <td className="p-4">{getPricePlusGST(item)}</td> */}
                                <td className="p-4">{item.gst || "-"}</td>
                                <td className="p-4">
                                  {/* <button 
                                                                    type="button" 
                                                                    onClick={() => {
                                                                        setItems(items => items.filter((_item) => item.entryId !== _item.entryId));
                                                                    }}
                                                                >
                                                                    <TrashIcon className="icon" />
                                                                </button> */}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th className="p-2 bg-slate-200 w-52">Total</th>
                            <td className="p-2 px-12">
                              {/* {
                                                        items.reduce((total, item) => total + getPriceAfterDiscount(item), 0)
                                                    } */}
                            </td>
                          </tr>
                          <tr>
                            <th className="p-2 bg-slate-200 w-52">GST</th>
                            <td className="p-2 px-12">
                              {/* {
                                                        items.reduce((total, item) => total + getGstAmount(item), 0)
                                                    } */}
                            </td>
                          </tr>
                          <tr>
                            <th className="p-2 bg-slate-200 w-52">
                              Grand Total
                            </th>
                            <td className="p-2 px-12">
                              {/* {
                                                        items.reduce((total, item) => total + getPricePlusGST(item), 0)
                                                    } */}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    )}
                    <div className="p-4" onClick={handleAddItem}>
                      {/* <OutlineButton type="button"  className="w-max">
                                        <PlusCircleIcon className="icon" />
                                        
                                    </OutlineButton> */}
                      Add Item
                    </div>
                  </div>
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

export default CreateSales;
