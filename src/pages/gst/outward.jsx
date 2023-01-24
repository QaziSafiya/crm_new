import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";

export default function OutwardSupplies() {

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Outward Supplies</h6>
                    <div className="flex jc-between ai-center flex-wrap g-1rem">
                        <div className="flex g-1rem ai-center flex-wrap">
                            <button className="button is-primary is-small ">Import Excel/Tally Data</button>
                            <button className="button is-primary is-small">Tally Reconcillation</button>
                            <span className="text-secondary">Return not submitted</span>
                        </div>
                        <div className="flex g-1rem flex-wrap">
                            <button className="button is-primary is-small ">Display Form</button>
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
                            <h6 className="text-secondary">Ledger Balances</h6>
                        </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Inward Supplies Details</th>
                                        <th>Supply Values</th>
                                        <th>IGST</th>
                                        <th>CGST</th>
                                        <th>SGST</th>
                                        <th>CESS</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th>1</th>
                                        <th>
                                            <button className="button is-primary is-small w-100pc">
                                                Taxable Supplies
                                            </button>
                                        </th>
                                        <td>
                                            <input type="text" className="input" />
                                        </td>
                                        <td>
                                            <input type="text" className="input" />
                                        </td>
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
                                        <th>2</th>
                                        <th>
                                            <button className="button is-primary is-small w-100pc">
                                                Non-Taxable Supplies
                                            </button>
                                        </th>
                                        <td>
                                            <input type="text" className="input" />
                                        </td>
                                        <td>
                                            <input type="text" className="input" />
                                        </td>
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
                                        <th>3</th>
                                        <th>
                                            <button className="button is-primary is-small w-100pc">
                                                Debit/Credit Notes
                                            </button>
                                        </th>
                                        <td>
                                            <input type="text" className="input" />
                                        </td>
                                        <td>
                                            <input type="text" className="input" />
                                        </td>
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
                                        <th>4</th>
                                        <th>
                                            <button className="button is-primary is-small w-100pc">
                                                ISD/TDS/TCS Credits
                                            </button>
                                        </th>
                                        <td>
                                            <input type="text" className="input" />
                                        </td>
                                        <td>
                                            <input type="text" className="input" />
                                        </td>
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
                                        <th>5</th>
                                        <th>
                                            <button className="button is-primary is-small w-100pc">
                                                HSN Wise Inward Summary
                                            </button>
                                        </th>
                                        <td>
                                            <input type="text" className="input" />
                                        </td>
                                        <td>
                                            <input type="text" className="input" />
                                        </td>
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
                                        <th>6</th>
                                        <th>
                                            <button className="button is-primary is-small w-100pc">
                                               Document Issued in Period
                                            </button>
                                        </th>
                                        <td>
                                            <input type="text" className="input" />
                                        </td>
                                        <td>
                                            <input type="text" className="input" />
                                        </td>
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
                                    
                                    <tr className="bordered text-center">
                                        <th></th>
                                        <th>
                                            Outward Supplies and GST (1 + 2 + 3 + 4 + 5):
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
                                    <tr className="bordered text-center">
                                        <th className="text-secondary">
                                            Less:
                                        </th>
                                        <th>
                                            Supply attracting reverse charge (invoice)
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
                                    <tr className="bordered text-center">
                                        <th className="text-secondary">
                                            Add/Less:
                                        </th>
                                        <th>
                                        Supply attracting reverse charge (notes)
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
                                    <tr className="bordered text-center">
                                        <th></th>
                                        <th>
                                            Tax Liability on Outward (A)
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
                                    <tr className="bordered text-center">
                                        <th></th>
                                        <th>
                                            As Per GSTR-3B
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