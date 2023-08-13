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
                            <button className="button bg-blue-500 text-white is-small has-icon">
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
                            <table>
                                <thead>
                                    <tr>
                                        <th>Inward Supplies Details</th>
                                        <th>IGST</th>
                                        <th>CGST</th>
                                        <th>SGST</th>
                                        <th>CESS</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>
                                            <button className="button bg-blue-500 text-white is-small w-100pc">
                                                Taxable Supplies
                                            </button>
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
                                    <tr>
                                        <th>
                                            <button className="button bg-blue-500 text-white is-small w-100pc">
                                                Non-Taxable Supplies
                                            </button>
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
                                    <tr>
                                        <th>
                                            <button className="button bg-blue-500 text-white is-small w-100pc">
                                                Debit/Credit Notes
                                            </button>
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

                                    <tr>
                                        <th>
                                            <button className="button bg-blue-500 text-white is-small w-100pc">
                                                ISD/TDS/TCS Credits
                                            </button>
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

                                    <tr>
                                        <th>
                                            <button className="button bg-blue-500 text-white is-small w-100pc">
                                                HSN Wise Inward Summary
                                            </button>
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
                                <thead>
                                    <tr>
                                        <th>Inward Supplies Details</th>
                                        <th>Supply Values</th>
                                        <th>IGST</th>
                                        <th>CGST</th>
                                        <th>SGST</th>
                                        <th>CESS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>
                                            <button className="button bg-blue-500 text-white is-small w-100pc">
                                                Inward Attract Reverse Charge
                                            </button>
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
                                    <tr>
                                        <th>
                                            <button className="button bg-blue-500 text-white is-small w-100pc">
                                                Advances Paid
                                            </button>
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
                                    <tr>
                                        <th>
                                            <button className="button bg-blue-500 text-white is-small w-100pc">
                                                Advances Adjusted
                                            </button>
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

                                    <tr>
                                        <th>
                                            <button className="button bg-blue-500 text-white is-small w-100pc">
                                                Reversal of Credit
                                            </button>
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

                                    <tr>
                                        <th>
                                            <button className="button bg-blue-500 text-white is-small w-100pc">
                                                Mismatch Adjustments
                                            </button>
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