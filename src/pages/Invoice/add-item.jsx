import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { BASE_URL } from "../../constants.js";
import axios from "axios";
import ItemList from "./Lists/ItemList";
import { Link } from "react-router-dom";
import AddCircleIcon from "../../components/icons/AddCircleIcon";

export default function AddItem() {
  const [showForm, setShowForm] = useState(false);

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
                <Link to={`/invoice/createitem/form`}>
                  <button
                    onClick={handleAddPartyClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-40 flex items-center space-x-2"
                  >
                    <AddCircleIcon />
                    <div>Add Item</div>
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mt-1">
            {!showForm && <ItemList />}
          </div>
        </div>
      </div>
    </div>
  );
}
