import { Link } from "react-router-dom";
import CashTransactionIcon from "../../../components/icons/CashTransactionIcon.jsx";
import CheckCircleIcon from "../../../components/icons/CheckCircleIcon.jsx";
import RupeeIcon from "../../../components/icons/RupeeIcon.jsx";
import Sidebar from "../../../components/Sidebar.jsx";
import Topbar from "../../../components/Topbar.jsx";

export default function GSTR1() {
    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <div className="container">
            <Sidebar open={false} />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <div className="flex jc-between ai-center flex-wrap g-1rem">
                        <div className="flex dir-col g-1rem">
                            <Link to="/gst/outward-supplies" className="button is-primary is-small ">Outward Supplies Liability (GSTR-1)</Link>
                            <Link to="/gst/inward-supplies" className="button is-primary is-small">Inward Supplies Credit (GSTR-2)</Link>
                        </div>
                        <div className="flex dir-col g-1rem">
                            <button className="button is-primary is-small">GST Login</button>
                            <button className="button is-primary is-small">Import Data</button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="section p-0">
                            <div className="flex g-1rem ai-center p-1rem">
                                <select name="a" className="select w-max-content">
                                    <option value="regular">Regular</option>
                                    <option value="composition">Composition</option>
                                </select>
                                <select name="b" className="select w-max-content">
                                    <option value="monthly">Monthly</option>
                                    <option value="quarterly">Quarterly</option>
                                    <option value="yearly">Yearly</option>
                                </select>
                                <select name="c" className="select w-max-content">
                                    <option value="gstr1">GSTR1</option>
                                    <option value="gstr3b">GSTR3B</option>
                                    <option value="gstr4">GSTR4</option>
                                </select>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>GSTR1 Sale</th>
                                        <th>Jan 2022</th>
                                        <th>Feb 2022</th>
                                        <th>Mar 2022</th>
                                    </tr>
                                </thead>
                            </table>
                            <div className="scrollable">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Ledger Balance</th>
                                            <th>IGST</th>
                                            <th>CGST</th>
                                            <th>CESS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Electronic Liability Register</th>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Electronic Cash Ledger</th>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Electronic Credit Ledger</th>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>TCS</th>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                            <td>
                                                <input type="text" className="input" />
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex p-1rem jc-between">
                                <div className="flex g-1rem flex-wrap">
                                    <Link to="/gst/gstr1/ledger" className="button is-primary is-small ">Ledger</Link>
                                    <button className="button is-primary is-small ">Liability</button>
                                    <button className="button is-primary is-small ">Credit</button>
                                    <button className="button is-primary is-small ">File Return</button>
                                </div>
                                <button className="button is-primary has-icon is-small">
                                    <CheckCircleIcon />
                                    Pay Tax
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}