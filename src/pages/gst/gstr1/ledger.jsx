import { useEffect } from "react";
import DownloadIcon from "../../../components/icons/DownloadIcon.jsx";
import SearchIcon from "../../../components/icons/SearchIcon.jsx";
import Sidebar from "../../../components/Sidebar.jsx";
import Topbar from "../../../components/Topbar.jsx";

export default function Ledger() {

    useEffect(()=>{
        
    },[])

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <div className="flex jc-end ai-center flex-wrap g-1rem">
                        <div className="flex g-1rem flex-wrap">
                            <button className="button is-primary is-small has-icon">
                                <SearchIcon />
                                Get Ledger From GSTIN
                            </button>
                            <button className="button is-primary is-small has-icon">
                                <DownloadIcon />
                                Download Excel/PDF From GSTIN
                            </button>
                            <button className="button is-primary is-small has-icon">
                                <DownloadIcon />
                                Import From Previous Year
                            </button>
                        </div>
                    </div>
                    <div className="section p-0">
                    <div className="scrollable">
                        <div className="p-1rem">
                            <h6 className="text-secondary">Ledger Balances</h6>
                        </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Ledger</th>
                                        <th>IGST</th>
                                        <th>CGST</th>
                                        <th>SGST</th>
                                        <th>CESS</th>
                                        <th>Total</th>
                                        <th>Without OTP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>Tax Liability Register</th>
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
                                        <td>
                                            <button className="button is-secondary is-small">GET</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Input Tax Credit Ledger</th>
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

                                        <td>
                                            <button className="button is-secondary is-small">GET</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Cash Ledger</th>
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

                                        <td>
                                            <button className="button is-secondary is-small">GET</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="bar">
                            <h6 className="text-secondary">Provisional Input Tax Credit Balance</h6>
                        </div>
                        <div className="scrollable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>As Per</th>
                                        <th>IGST</th>
                                        <th>CGST</th>
                                        <th>SGST</th>
                                        <th>CESS</th>
                                        <th>Total</th>
                                        <th>Without OTP</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>GSTIN</th>
                                    </tr>
                                    <tr>
                                        <th>Software</th>
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

                                        <td>
                                            <button className="button is-secondary is-small">GET</button>
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