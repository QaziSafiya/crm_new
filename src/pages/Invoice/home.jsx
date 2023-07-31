import { useEffect, useMemo, useState } from "react";

import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import axios from "axios";
import InvoicesList from "./Lists/InvoicesList";
import ArrowRightIcon from "../../components/icons/ArrowRightIcon";
import { AiFillCaretRight, AiOutlineRight } from "react-icons/ai";
import AddCircleIcon from "../../components/icons/AddCircleIcon";
import { BASE_URL } from "../../constants.js";
import BillingPeriodSelect from "./BillingPeriodSelect";
import InvoiceForm from "./forms/InvoiceForm";
import { Link } from "react-router-dom";
import Invoice from "./download/Invoice";

export default function HomeInvoice() {
  const [showForm, setShowForm] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState("day");

  const handleBillingPeriodChange = (e) => {
    setBillingPeriod(e.target.value);
  };

  const handleAddPartyClick = () => {
    setShowForm(true);
  };

  let businessName = JSON.parse(localStorage.getItem("itaxData"));

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Topbar />
        <div className="inner-container">
          {!showForm && (
            <h6 className="text-secondary font-bold">Invoice Dashboard</h6>
          )}

          <div className="flex justify-between mb-0 text-primary">
            {!showForm && (
              <div className="p-4 rounded shadow mb-4 w-52 bg-blue-500 text-white">
                <p>Business Name</p>
                <h2 className="text-lg font-bold mb-2">{`${businessName.user.firstName} ${businessName.user.lastName}`}</h2>
                {/* Add additional information or functionality related to the business name block */}
              </div>
            )}

            {/* <div>
              <Link to={`/invoice/pdf`}>
              show pdf
              </Link>
            </div> */}

            <div className="w-28 ">
              {!showForm && (
                <BillingPeriodSelect
                  billingPeriod={billingPeriod}
                  onChange={handleBillingPeriodChange}
                />
              )}
            </div>

            <div>
              {!showForm && (
                <Link to={`/invoice/form`}>
                  <button
                    onClick={handleAddPartyClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  flex items-center space-x-2"
                  >
                    <AddCircleIcon />
                    <div>Create Invoice</div>
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className="mt-5">
            {!showForm && (
              <div className="flex gap-2 items-center justify-center">
                <div className="border-2 w-1/2 h-36 flex justify-between items-center pl-6 pr-4 rounded-xl bg-blue-300">
                  <div>
                    <h4>₹ 0</h4>
                    <br></br>
                    <p className="text-green-500">To collect</p>
                  </div>
                  <div>
                    <AiOutlineRight />
                  </div>
                </div>

                <div className="border-2 w-1/2 h-36 flex justify-between items-center pl-6 pr-4 rounded-xl bg-blue-300">
                  <div>
                    <h4>₹ 0</h4>
                    <br></br>
                    <p className="text-rose-500">To Pay</p>
                  </div>
                  <div>
                    <AiOutlineRight />
                  </div>
                </div>

                <div className="border-2 w-1/2 h-36 flex justify-between items-center pl-6 pr-4 rounded-xl bg-blue-300">
                  <div>
                    <h4>Stock value</h4>
                    <br></br>
                    <p>Value of items</p>
                  </div>
                  <div>
                    <AiOutlineRight />
                  </div>
                </div>

                <div className="border-2 w-1/2 h-36 flex justify-between items-center pl-6 pr-4 rounded-xl bg-blue-300">
                  <div>
                    <h4>₹ 0</h4>
                    <br></br>
                    <p>This weeks sale</p>
                  </div>
                  <div>
                    <AiOutlineRight />
                  </div>
                </div>

                <div className="border-2 w-1/2 h-36 flex justify-between items-center pl-6 pr-4 rounded-xl bg-blue-300">
                  <div>
                    <h4>Total Balance</h4>
                    <br></br>
                    <p>Cash+Bank Balance</p>
                  </div>
                  <div>
                    <AiOutlineRight />
                  </div>
                </div>

                <div className="border-2 w-1/2 h-36 flex justify-between items-center pl-6 pr-4 rounded-xl bg-blue-300">
                  <div>
                    <h4>Reports</h4>
                    <br></br>
                    <p>Sales,Party,GST</p>
                  </div>
                  <div>
                    <AiOutlineRight />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center mt-2">
            {!showForm && <InvoicesList />}
          </div>
        </div>
      </div>
    </div>
  );
}
