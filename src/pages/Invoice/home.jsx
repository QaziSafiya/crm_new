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
import ArrowDownIcon from "../../components/icons/ArrowDownIcon";
import ArrowUpIcon from "../../components/icons/ArrowUpIcon";
import useAuth from "../../hooks/useAuth";
// import Invoice from "./download/Invoice";

export default function HomeInvoice() {
  const { currentUser,token } = useAuth();

  const [invoices, setInvoices] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState("day");

  useEffect(() => {
    // Fetch all invoices when the component mounts
    getInvoices();
  }, []);

  const getInvoices = async () => {
    try {
      const response = await fetch(`${BASE_URL}/invoice/invoices`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch invoices - HTTP Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setInvoices(data.invoices);
      // Do something with the response data if needed
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };

  
  const handleBillingPeriodChange = (e) => {
    setBillingPeriod(e.target.value);
  };

  const handleAddPartyClick = () => {
    setShowForm(true);
  };


  const totalSalePrice = invoices
  .filter(invoice => invoice.type === 'sales') // Filter invoices with type 'sale'
  .reduce((total, invoice) => Number(total) + Number(invoice.totalAmount), 0);

  const totalPurchasePrice = invoices
  .filter(invoice => invoice.type === 'purchase') // Filter invoices with type 'sale'
  .reduce((total, invoice) => Number(total) + Number(invoice.totalAmount), 0);
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
                <h2 className="text-lg font-bold mb-2">{`${currentUser.user.firstName} ${currentUser.user.lastName}`}</h2>
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

            {/* <div>
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
            </div> */}
          </div>

          <div className="mt-5">
            {!showForm && (
              <div className="flex gap-2 items-center justify-center">
                <div className="border-2 w-1/2 h-36 flex justify-between items-center pl-6 pr-4 rounded-xl bg-blue-300">
                  <div>
                    <h4 >₹ {totalPurchasePrice} </h4>
                    <br></br>
                    <p className="text-green-500">To collect</p>
                    <ArrowDownIcon  />
                  </div>
                  <div>
                    <AiOutlineRight />
                  </div>
                </div>

                <div className="border-2 w-1/2 h-36 flex justify-between items-center pl-6 pr-4 rounded-xl bg-blue-300">
                  <div>
                    <h4>₹ {totalSalePrice}</h4>
                    <br></br>
                    <p className="text-rose-500">To Pay</p>
                    <ArrowUpIcon  />
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
                    <h4>₹ {totalPurchasePrice+totalSalePrice}</h4>
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
