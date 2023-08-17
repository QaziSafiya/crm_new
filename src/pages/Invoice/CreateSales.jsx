import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { BASE_URL } from "../../constants.js";
// import ItemDropdown from "./dropdowns/ItemDropdown";
import DeleteIcon from "../../components/icons/DeleteIcon.jsx";
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
  // credit: null,
  details: "",
  extraDetails: "",
  items: [
    {
      id: "",
      quantity: null,
      // discount: null
    },
  ],
  userId: null,

  modeOfPayment: "",
};

const CreateSales = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [partyList, setPartyList] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [itemList, setItemList] = useState([]);
  const [showItemDropdown, setShowItemDropdown] = useState(false);
  const [showPartyDropdown, setShowPartyDropdown] = useState(false);

  const [items, setItems] = useState([
    {
      entryId: null,
      id: null,
      itemName: "",
      price: 0,
      quantity: 0,
      // discount: 0,
      gst: 0,
      unit: "",
      hsnCode: "",
    },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [item, setItem] = useState([
    {
      // itemId: "",
      quantity: 0,
      // discount: 0,
    },
  ]);
  const [partyState, setPartyState] = useState("");
  const [itemState, setItemState] = useState("");
  const [itemObj, setItemObj] = useState({});
  const [totGst, setTotGst] = useState(null);
  const [quantity, setQuantity] = useState(1);
  // const [discount, setDiscount] = useState(0);

  // Function to handle changes in quantity for a specific item
  const handleQuantityChange = (event, index) => {
    const { value } = event.target;
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity = parseInt(value);
      return updatedItems;
    });

    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);

    // Update the items array in formData by creating a new array and replacing the item at the specified index
    setFormData((prevFormData) => {
      const updatedItems = [...prevFormData.items];
      updatedItems[index] = { ...updatedItems[index], quantity: newQuantity };
      return {
        ...prevFormData,
        items: updatedItems,
      };
    });
  };

  // Function to handle changes in discount for a specific item
  // const handleDiscountChange = (event, index) => {
  //   const { value } = event.target;
  //   setItems((prevItems) => {
  //     const updatedItems = [...prevItems];
  //     updatedItems[index].discount = parseFloat(value);
  //     return updatedItems;
  //   });

  //   const newDiscount = parseFloat(event.target.value);
  //   setDiscount(newDiscount);

  //   // Update the items array in formData by creating a new array and replacing the item at the specified index
  //   setFormData((prevFormData) => {
  //     const updatedItems = [...prevFormData.items];
  //     updatedItems[index] = { ...updatedItems[index], discount: newDiscount };
  //     return {
  //       ...prevFormData,
  //       items: updatedItems,
  //     };
  //   });
  // };

  useEffect(() => {
    setShowDropdown(new Array(items.length).fill(false));
  }, [items]);

  // const updateItemInFormData = (index, updatedItem) => {
  //   setFormData((prevFormData) => {
  //     const updatedItems = [...prevFormData.items];
  //     updatedItems[index] = {
  //       ...updatedItems[index],
  //       ...updatedItem,
  //     };
  //     return {
  //       ...prevFormData,
  //       items: updatedItems,
  //     };
  //   });
  // };

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

  const handleItemsFocus = (index) => {
    const updatedDropdown = new Array(items.length).fill(false);
    updatedDropdown[index] = true;
    setShowDropdown(updatedDropdown);
    fetchItems();
  };

  const handleSelectItem = (item, index) => {
    setItemObj(item); // Set the selected item

    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = { ...updatedItems[index], selectedItem: item };
      return updatedItems;
    });

    const newItem = {
      id: item.id,
      quantity: 1, // You can set a default quantity here if needed
      // discount: 0, // You can set a default discount here if needed
    };

    // Update the items array in formData by creating a new array and replacing the item at the specified index
    setFormData((prevFormData) => {
      const updatedItems = [...prevFormData.items];
      updatedItems[index] = newItem;
      return {
        ...prevFormData,
        items: updatedItems,
      };
    });
    setShowDropdown((prevDropdown) => {
      const updatedDropdown = [...prevDropdown];
      updatedDropdown[index] = false;
      return updatedDropdown;
    });

    calculateTotalGst(); // Call the calculateTotalGst function after selecting the item
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
      // Filter the partyList to only include parties with type "customer"
      const customers = data.parties.filter(
        (party) => party.type === "customer"
      );
      setPartyList(customers);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePartyNameFocus = () => {
    fetchParties();
    setShowPartyDropdown(true);
  };

  const handleSelectParty = (party) => {
    // Set the partyState first

    setFormData((prevFormData) => ({
      ...prevFormData,
      partyId: party.id,
      partyName: party.partyName,
      // type: party.type,
      phone: party.phone,
      userId: party.userId,
      // Set the stateOfSupply in the form data
    }));

    console.log(party);
    setPartyState(party.address);
    setShowPartyDropdown(false);
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
        : name === "items"
        ? [{ id: selectedItem ? selectedItem.id : "" }] // Use the selected item's itemId
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
    setItems((prevItems) => [
      ...prevItems,
      {
        entryId: null,
        id: null,
        itemName: "",
        price: 0,
        quantity: 0,
        // discount: 0,
        gst: 0,
        unit: "",
        hsnCode: "",
      },
    ]);
  };

  const calculateTotal = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.selectedItem
        ? Number(item.selectedItem.purchasePrice) * Number(item.quantity) +
          Number(item.selectedItem.purchasePrice) *
            Number(item.quantity) *
            Number(totGst / 100)
        : 0;
    });
    return total;
  };

  useEffect(() => {
    const totalAmount = calculateTotal();
    setFormData((prevFormData) => ({
      ...prevFormData,
      totalAmount,
    }));
  }, [items, totGst]);

  const calculateGstOnly = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.selectedItem
        ? Number(item.selectedItem.purchasePrice) *
          Number(item.quantity) *
          Number(totGst / 100)
        : 0;
    });
    return total;
  };

  const handleRemoveItem = (index) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1); // Remove the item at the specified index
      return updatedItems;
    });
  };
  const handleStateOfSupplyChange = (event) => {
    const { value } = event.target;
    setItemState(value); // Update the itemState with the selected value
    // You can also update the formData state if needed, but this is optional
    setFormData((prevFormData) => ({ ...prevFormData, stateOfSupply: value }));
  };
  // Calculate the total GST based on the type of supply (intra-state or inter-state)

  console.log(partyState == itemState);
  console.log(formData.cgst);

  // Calculate the total GST based on the type of supply (intra-state or inter-state)
  const calculateTotalGst = () => {
    if (itemObj && partyState === itemState) {
      // Intra-State Transaction
      const totalGst = Number(itemObj.cgst || 0) + Number(itemObj.sgst || 0);
      setFormData((prevFormData) => ({
        ...prevFormData,
        totalGst,
        cgst: Number(itemObj.cgst),
        igst: Number(itemObj.igst),
        utgst: Number(itemObj.utgst),
        sgst: Number(itemObj.sgst),
      }));
      setTotGst(totalGst);
    } else if (itemObj) {
      // Inter-State Transaction
      const totalGst = Number(itemObj.igst) || 0;
      setFormData((prevFormData) => ({
        ...prevFormData,
        totalGst,
        cgst: Number(itemObj.cgst),
        igst: Number(itemObj.igst),
        utgst: Number(itemObj.utgst),
        sgst: Number(itemObj.sgst),
      }));
      setTotGst(totalGst);
    } else {
      // Reset total GST when itemObj is null (no item selected)
      setTotGst(null);
    }
  };

  // Call the calculateTotalGst function whenever there are changes in cgst, sgst, igst, utgst, or stateOfSupply
  useEffect(() => {
    calculateTotalGst();
  }, [
    itemObj.cgst,
    itemObj.sgst,
    itemObj.igst,
    itemObj.utgst,
    itemObj.stateOfSupply,
    formData.stateOfSupply,
    itemState,
  ]);

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          <div className="p-8 bg-white rounded shadow-lg">
            <h2 className="text-2xl font-bold text-secondary mb-6">
              Create Sales
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
                        onBlur={() => setShowPartyDropdown(false)}
                        className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 z-50" // Add z-50 class to make sure the input stays on top
                        required
                      />
                      {showPartyDropdown && partyList.length > 0 && (
                        <ul className="bg-white border border-gray-300 mt-2 rounded shadow-lg absolute z-40 w-full">
                          <p className="bg-blue-300 text white px-4">
                            Party Name
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

                    <div className="flex justify-between">
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

                    <div className="mb-5 w-56">
                      <label
                        htmlFor="type"
                        className="block text-sm font-bold text-gray-700 mb-2"
                      >
                        Type:
                      </label>
                      <select
                        id="type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 h-10"
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="sales">Sales</option>
                       
                        <option value="sales_return">Sales Return</option>
                       
                      </select>
                    </div>
                    </div>

                   <div className="flex justify-between">
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

                    <div className="mb-7 mt-12">
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

                    {/* <div className="mb-6">
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
                className="w-6 h-6 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500 h-10"
              />
            </div> */}

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
                        <option value="upi">UPI</option>
                        <option value="credit">Credit</option>
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
                        value={itemState} // Use the itemState value here instead of formData.stateOfSupply
                        onChange={handleStateOfSupplyChange} // Use the new handler for instant updates
                        className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 bg-white h-10"
                        required
                      >
                        <option value="">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
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
                    {!items.length ? (
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
                            {/* <th className="p-2">Discount %</th> */}
                            <th className="whitespace-nowrap p-2">GST %</th>
                            <th className="p-2">Total</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className="p-4">
                                  <div key={index} className="mb-4 relative">
                                    <input
                                      type="text"
                                      id={`items${index}`} // Use a unique ID for each input element
                                      name="items"
                                      placeholder="+ Add Item"
                                      value={
                                        item.selectedItem
                                          ? item.selectedItem.itemName
                                          : ""
                                      }
                                      onChange={(event) =>
                                        handleChange(event, index)
                                      } // Pass the index to handleChange
                                      onFocus={() => handleItemsFocus(index)} // Pass the index to handleItemsFocus
                                      onBlur={() =>
                                        handleSelectItem(
                                          item.selectedItem,
                                          index
                                        )
                                      } // Pass the selected item and index to handleSelectItem
                                      className="w-full border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 z-50" // Add z-50 class to make sure the input stays on top
                                      required
                                    />
                                    {showDropdown[index] &&
                                      itemList.length > 0 && (
                                        <ul className="bg-white border border-gray-300 mt-2 rounded shadow-lg absolute z-40 w-full">
                                          {itemList.map((item) => (
                                            <li
                                              key={item.id}
                                              onMouseDown={() =>
                                                handleSelectItem(item, index)
                                              } // Pass the index to the function
                                              className="px-4 py-2 cursor-pointer hover:bg-gray-300"
                                              title="Add"
                                            >
                                              {item.itemName}
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                  </div>
                                </td>
                                <td className="p-4">
                                  {item.selectedItem
                                    ? item.selectedItem.price
                                    : ""}
                                </td>
                                <td className="p-4">
                                  <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(event) =>
                                      handleQuantityChange(event, index)
                                    }
                                    className="border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 w-24"
                                  />
                                </td>
                                {/* <td className="p-4">
  <input
    type="number"
    value={item.discount}
    onChange={(event) => handleDiscountChange(event, index)}
    className="border border-gray-400 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500 w-24"
  />
</td> */}

                                <td className="p-4">{totGst}</td>

                                <td className="p-4">
                                  {item.selectedItem
                                    ? item.selectedItem.purchasePrice *
                                        item.quantity +
                                      item.selectedItem.purchasePrice *
                                        item.quantity *
                                        (totGst / 100)
                                    : ""}
                                </td>
                                <td>
                                  <button
                                    className="ml-2 text-red-600"
                                    onClick={() => handleRemoveItem(index)}
                                  >
                                    <DeleteIcon />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th className="p-2 bg-slate-200 w-52">Total</th>
                            <td className="p-2 px-12">
                              {calculateTotal() - calculateGstOnly()}
                            </td>
                          </tr>
                          <tr>
                            <th className="p-2 bg-slate-200 w-52">GST</th>
                            <td className="p-2 px-12">{calculateGstOnly()}</td>
                          </tr>
                          <tr>
                            <th className="p-2 bg-slate-200 w-52">
                              Grand Total
                            </th>
                            <td className="p-2 px-12">{calculateTotal()}</td>
                          </tr>
                        </tfoot>
                      </table>
                    )}
                    <div
                      className="p-4 bg-blue-500 text-white w-32 text-center rounded-xl mt-5"
                      onClick={handleAddItem}
                    >
                      <button>Add Item</button>
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
