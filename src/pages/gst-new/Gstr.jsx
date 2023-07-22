import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import ArrowRightIcon from "../../components/icons/ArrowRightIcon";
import "./Gstr.css"
import LoginModal from './LoginModal';
import { Link } from "react-router-dom";

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];


    const tableData = [
      { supplyValue: "", igst: 18, cgst: 9, sgst: 9, cess: 2 },
      { supplyValue: "", igst: 36, cgst: 18, sgst: 18, cess: 4 },
      { supplyValue: "", igst: 54, cgst: 27, sgst: 27, cess: 6 },
      { supplyValue: "", igst: 72, cgst: 36, sgst: 36, cess: 8 },
      { supplyValue: "", igst: 90, cgst: 45, sgst: 45, cess: 10 },
      { supplyValue: "", igst: 108, cgst: 54, sgst: 54, cess: 12 },
      { supplyValue: "", igst: 126, cgst: 63, sgst: 63, cess: 14 },
      { supplyValue: "", igst: 144, cgst: 72, sgst: 72, cess: 16 },
    ];

const yearRanges = [
  "2020-2021",
  "2021-2022",
  "2022-2023",
  "2023-2024",
  // Add more year ranges as needed
];

const Gstr = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = () => {
    // Handle login logic here
    closeModal();
  };
  

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="container">
      <Sidebar open={false} />
      <div className="main">
        <Topbar />
        <div className="inner-container">
      <div className="flex gap-2 pl-1">
        <div className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white rounded-md">
          Regular Return
        </div>
        <div className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white rounded-md">
          Summary Return GSTR-3B
        </div>
        <div className="pt-2 pb-2 pl-3 pr-3">Aadhar verification status:- Pending</div>
        <div className="pt-2 pb-2 pl-3 pr-3 text-blue-600 gap-2 text-sm">
          {">>"}Bulk Utility
        </div>
        <div className="pt-2 pb-2 pl-3 pr-3 text-blue-600 gap-2 text-sm">
          {">>"}EasyInvoice
        </div>
        <div className="pt-2 pb-2 pl-3 pr-3 text-blue-600 gap-2 text-sm">
          {">>"}e-way Bill
        </div>
      </div>
      <hr></hr>

      <div className="flex">
        <div className="w-3/4 pl-1">
          <div className="flex gap-2">
            <div className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white text-center rounded-md">
              Permanent Information
            </div>
            <div className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white text-center rounded-md">
              Registration Details
            </div>
            <div className="pt-2 pb-2 pl-1 pr-1 text-center text-blue-600 text-sm">
              Registered GSTIN
            </div>
            <div className="pt-2 pb-2 pl-1 pr-1 text-center text-blue-600 text-sm">
              {">>"}Get GSTN Data
            </div>
            <div className="pt-2 pb-2 pl-1 pr-1 text-center text-blue-600 text-sm">
              {">>"}GSTN Notice/Order
            </div>
          </div>

          <div className="flex gap-2">
            <div className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white text-center rounded-md">
              Master tables
            </div>
            <div className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white text-center rounded-md">
              Import Excel/Tally Data
            </div>
            <div className="pt-2 pb-2 pl-1 pr-1 text-center text-blue-600 text-sm">
              GSTR-3B filing is pending
            </div>
            <div className="pt-2 pb-2 pl-1 pr-1 text-center text-blue-600 text-sm">
              | GSTR-1 filing is pending
            </div>
            <div className="pt-2 pb-2 pl-1 pr-1 text-center text-blue-600 text-sm">
              | GSTR-9 filing is pending
            </div>
          </div>
        </div>
        <div className="border-2 w-1/4 flex flex-col justify-center align-center">
          <div className="flex justify-center pt-1 ">
            <label htmlFor="month">Period:</label>
            <select
              id="month"
              name="month"
              value={selectedMonth}
              onChange={handleMonthChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-10"
            >
              <option value="">Month</option>
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>

            <label htmlFor="year" className="ml-3">
              F.Y:
            </label>
            <select
              id="year"
              name="year"
              value={selectedYear}
              onChange={handleYearChange}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Year</option>
              {yearRanges.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center gap-2 mt-1">
            <div className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white rounded-md">
              Check Return Status
            </div>
            <div className="border-2 pt-2 pb-2 pl-3 pr-3 bg-blue-500 text-white rounded-md" onClick={openModal}>
              Login Details
            </div>
            <LoginModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} />
          </div>
        </div>
      </div>

      <div className="flex">
        <div className="border-2 w-1/4 pt-10 ">

          <Link to="/gst/outward-supplies">
          <div className="flex justify-between pr-1 pl-1">
            <div className="border-2 pt-2 pb-2 pl-2 pr-2 bg-blue-500 text-white text-left text-sm rounded-md">
              Outward Supplies Liability (GSTR-1)
            </div>
            <div className="text-sm pt-2">A</div>
          </div>
          </Link>
          
          <Link to="/gst/inward-supplies">
          <div className="flex justify-between pr-1 pl-1">
            <div className="border-2 pt-2 pb-2 pl-2 pr-2 bg-blue-500 text-white text-left text-sm rounded-md">
              Invard Supplies Credit (GSTR-2)
            </div>
            <div className="text-sm pt-2">B</div>
          </div>
          </Link>

          <div className="flex justify-between align-center pt-3 pb-2 pl-1 pr-1">
            <div className="text-sm">Utilized ITC Balance</div>
            <div className="text-sm">C</div>
          </div>

          <div className="flex justify-between pt-3 pb-2 pl-1 pr-1">
            <div className="text-sm">Net Tax Liability on Outward Supply:(A-C)</div>
            <div className="text-sm">D</div>
          </div>

          <div className="flex justify-between pt-3 pb-2 pl-1 pr-1">
            <div className="text-sm">Add: Tax Liability on Inward Supply</div>
            <div className="text-sm">E</div>
          </div>

          <div className="flex justify-between pt-3 pb-2 pl-1 pr-1">
            <div className="text-sm">Total Tax Payyable in Csah: (D+E)</div>
            <div className="text-sm">F</div>
          </div>

          <div className="flex justify-between pt-3 pb-2 pl-1 pr-1">
            <div className="text-sm">Less: Utilized Cash Balance</div>
            <div className="text-sm">G</div>
          </div>

          <div className="flex justify-between pt-3 pb-2 pl-1 pr-1">
            <div className="text-sm">Balance GST Due: (F-G)</div>
            <div className="text-sm">H</div>
          </div>
        </div>
        <div className="border-2 w-2/4 pt-0">
          <table className="border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 bg-gray-300 p-2 ">Supply Value</th>
                <th className="border border-gray-300 bg-gray-300 p-2">IGST</th>
                <th className="border border-gray-300 bg-gray-300 p-2">CGST</th>
                <th className="border border-gray-300 bg-gray-300 p-2">SGST</th>
                <th className="border border-gray-300 bg-gray-300 p-2">CESS</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{row.supplyValue}</td>
                  <td className="border border-gray-300 p-2">{row.igst}</td>
                  <td className="border border-gray-300 p-2">{row.cgst}</td>
                  <td className="border border-gray-300 p-2">{row.sgst}</td>
                  <td className="border border-gray-300 p-2">{row.cess}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-2 w-1/4 pt-0">
          <h1 className="flex justify-between pt-2 pb-2 pl-1 pr-1 font-semibold">Ledger Balances</h1>
          <div className="flex justify-between pt-2 pb-2 pl-1 pr-1 mr-1 text-sm">
            <h1 className="flex justify-between pt-2 pb-2 pl-3 pr-3 border-2 bg-blue-500 text-white rounded-md">Ledger details</h1>
            <h1>Balance</h1>
          </div>
          <div className="flex justify-between pt-2 pb-2 pl-1 pr-1 mr-1 text-sm">
            <h1>Credit Ledger</h1>
            <h1>0</h1>
          </div>
          <div className="flex justify-between pt-2 pb-2 pl-1 pr-1 mr-1 text-sm">
            <h1>Liability Ledger</h1>
            <h1>0</h1>
          </div>
          <div className="flex justify-between pt-2 pb-2 pl-1 pr-1 mr-1 text-sm">
            <h1>Cash Ledger</h1>
            <h1>0</h1>
          </div>
          <div className="flex justify-between pt-2 pb-2 pl-1 pr-1 mr-1 text-sm">
            <h1 className="flex justify-between pt-2 pb-2 pl-3 pr-3 border-2 bg-blue-500 text-white rounded-md">PMT09</h1>
            <h1>0</h1>
          </div>
          <div className="flex justify-between pt-2 pb-2 pl-1 pr-1 mr-1 text-sm">
            <h1 className="flex justify-between pt-2 pb-2 pl-3 pr-3 border-2 bg-blue-500 text-white rounded-md">Late Fees +</h1>
            <h1>0</h1>
          </div>
          <hr></hr>
          <hr></hr>
          <div className="flex gap-10 text-sm justify-start items-center mt-2">
            <div className="flex justify-between pt-2 pb-2 pl-3 pr-3 border-2 bg-blue-500 text-white rounded-md">Annual Return GSTR-9</div>
            <div className="flex justify-between pt-2 pb-2 pl-3 pr-3 border-2 bg-blue-500 text-white rounded-md">GSTR-9C</div>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Gstr;
