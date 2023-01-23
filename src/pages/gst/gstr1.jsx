import CashTransactionIcon from "../../components/icons/CashTransactionIcon.jsx";
import CheckCircleIcon from "../../components/icons/CheckCircleIcon.jsx";
import RupeeIcon from "../../components/icons/RupeeIcon.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";

export default function GSTR1() {
    const handleSubmit = e => {
        e.preventDefault();
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">GSTR1</h6>
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
                            <div className="flex p-1rem jc-end">
                                <button className="button is-primary has-icon">
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