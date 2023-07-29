import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { BASE_URL } from "../../constants";
import PartyList from "./Lists/PartyList";
import CustomerList from "./Lists/CustomerList";
import { Link } from "react-router-dom";
import AddCircleIcon from "../../components/icons/AddCircleIcon";

export default function AddParty() {
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
              <h6 className="text-secondary font-bold">Add New Party</h6>
            )}
            <div className="grid justify-items-end mb-0 p-4">
              {!showForm && (
                <Link to={`/invoice/addparty/form`}>
                <button
  onClick={handleAddPartyClick}
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-40 flex items-center space-x-2"
>
  <AddCircleIcon />
  <span>Add Party</span>
</button>


                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mt-1">
            {!showForm && <PartyList />}
          </div>
          <div>{!showForm && <CustomerList />}</div>
        </div>
      </div>
    </div>
  );
}
