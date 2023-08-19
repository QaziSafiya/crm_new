import { Link } from "react-router-dom";
import DownloadIcon from "../../components/icons/DownloadIcon.jsx";
import HandshakeIcon from "../../components/icons/HandshakeIcon.jsx";
import UploadIcon from "../../components/icons/UploadIcon.jsx";
import ViewIcon from "../../components/icons/ViewIcon.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";

export default function InwardSupplies() {

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Inward Supplies</h6>
                    <div className="flex jc-between ai-center flex-wrap g-1rem">
                        {/* <div className="flex g-1rem ai-center flex-wrap">
                            <button className="button bg-blue-500 text-white is-small has-icon">
                                <UploadIcon />
                                Import Excel/Tally Data
                            </button>
                            <button className="button bg-blue-500 text-white is-small has-icon">
                                <HandshakeIcon />
                                Tally Reconcillation
                            </button>
                            <span className="text-secondary">Return not submitted</span>
                        </div> */}
                        <div className="flex g-1rem flex-wrap">
                            <button className="custom-button1 button bg-blue-500 text-white is-small has-icon w-44">
                                <ViewIcon />
                                Display Form
                            </button>
                            <div className="flex g-1rem ai-center">
                                <label htmlFor="period">Period</label>
                                <select name="b" id="period" className="select w-max-content">
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="section p-0">
                    <div className="scrollable">
                        <div className="p-1rem">
                        </div>
                            <table >
                                <thead className="bg-gray-300">
                                    <tr  >
                                        <th> Inward Supplies Details</th>
                                        <th>IGST</th>
                                        <th>CGST</th>
                                        <th>SGST</th>
                                        <th>CESS</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white">
                                        <th>
                                            <Link to={'/gst/taxable-supplies'}>
                                            <button className="custom-button1 button bg-blue-500 text-white is-small w-100pc flex justify-start">
                                                Taxable Supplies
                                            </button>
                                            </Link>
                                        </th>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <th>
                                        <Link to={'/gst/non-taxable-supplies'}>
                                            <button className="custom-button1 button bg-blue-500 text-white is-small w-100pc flex justify-start">
                                                Non-Taxable Supplies
                                            </button>
                                            </Link>
                                        </th>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <th>
                                        <Link to={'/gst/debit-credit'}>
                                            <button className="custom-button1 button bg-blue-500 text-white is-small w-100pc flex justify-start">
                                                Debit/Credit Notes
                                            </button>
                                            </Link>
                                        </th>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                    </tr>

                                    <tr className="bg-white">
                                        <th>
                                        <Link to={'/gst/isd-tds'}>
                                            <button className="custom-button1 button bg-blue-500 text-white is-small w-100pc flex justify-start">
                                                ISD/TDS/TCS Credits
                                            </button>
                                            </Link>
                                        </th>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                    </tr>

                                    <tr className="bg-white">
                                        <th>
                                        {/* <Link to={'/gst/taxable-supplies'}> */}
                                            <button className="custom-button1 button bg-blue-500 text-white is-small w-100pc flex justify-start">
                                                HSN Wise Inward Summary
                                            </button>
                                            {/* </Link> */}
                                        </th>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                    </tr>
                                    <tr className="bordered text-center">
                                        <th>
                                            Total inward and ITC (1 + 2 + 3 + 4):
                                        </th>
                                        <td>
                                            0
                                        </td>
                                        <td>
                                            0
                                        </td>
                                        <td>
                                            0
                                        </td>
                                        <td>
                                            0
                                        </td>
                                        <td>
                                            0
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bar">
                            <h6 className="text-secondary">Provisional Input Tax Credit Balance</h6>
                        </div>
                        <div className="scrollable">
                        <div className="p-1rem">
                            <h6 className="text-secondary">Ledger Balances</h6>
                        </div>
                            <table>
                                <thead className="bg-gray-300">
                                    <tr >
                                        <th>Inward Supplies Details</th>
                                        <th>Supply Values</th>
                                        <th>IGST</th>
                                        <th>CGST</th>
                                        <th>SGST</th>
                                        <th>CESS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white">
                                        <th>
                                            <Link to={'/gst/iarc'}>
                                            <button className="custom-button1 button bg-blue-500 text-white is-small w-100pc flex justify-start">
                                                Inward Attract Reverse Charge
                                            </button>
                                            </Link>
                                        </th>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>

                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <th>
                                            <Link to={'/gst/advance-paid'}>
                                            <button className="custom-button1 button bg-blue-500 text-white is-small w-100pc flex justify-start">
                                                Advances Paid
                                            </button>
                                            </Link>
                                        </th>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>

                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                    </tr>
                                    <tr className="bg-white">
                                        <th>
                                            <Link to={'/gst/advances-adjusted'}>
                                            <button className="custom-button1 button bg-blue-500 text-white is-small w-100pc flex justify-start">
                                                Advances Adjusted
                                            </button>
                                            </Link>
                                        </th>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>

                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                    </tr>

                                    <tr className="bg-white">
                                        <th>
                                            <Link to={'/gst/roc'}>
                                            <button className="custom-button1 button bg-blue-500 text-white is-small w-100pc flex justify-start">
                                                Reversal of Credit
                                            </button>
                                            </Link>
                                        </th>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>

                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                    </tr>

                                    <tr className="bg-white">
                                        <th>
                                            <Link to={'/gst/mismatch-adjustments'}>
                                            <button className="custom-button1 button bg-blue-500 text-white is-small w-100pc flex justify-start">
                                                Mismatch Adjustments
                                            </button>
                                            </Link>
                                        </th>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>

                                        <td>
                                            <input type="text" className="input is-small" />
                                        </td>
                                    </tr>
                                    <tr className="bordered text-center">
                                        <th>
                                            Total Liability on Inward (a + b + c + d + e):
                                        </th>
                                        <td>
                                            0
                                        </td>
                                        <td>
                                            0
                                        </td>
                                        <td>
                                            0
                                        </td>
                                        <td>
                                            0
                                        </td>
                                        <td>
                                            0
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}