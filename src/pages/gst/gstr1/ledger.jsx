import { useContext } from "react";
import { useEffect, useState } from "react";
import DownloadIcon from "../../../components/icons/DownloadIcon.jsx";
import SearchIcon from "../../../components/icons/SearchIcon.jsx";
import ErrorMessage from "../../../components/messages/ErrorMessage.jsx";
import Modal from "../../../components/Modal.jsx";
import Sidebar from "../../../components/Sidebar.jsx";
import Topbar from "../../../components/Topbar.jsx";
import { BASE_URL } from "../../../constants.js";
import useAuth from "../../../hooks/useAuth.js";
import { StoreContext } from "../../../store/store-context.js";

const formatDateForApi = date => {
    const year = date.getFullYear();
    const dateOfMonth = date.getDate();
    const month = date.getMonth() + 1;

    return `${dateOfMonth < 10 ? `0${dateOfMonth}` : dateOfMonth}/${month < 10 ? `0${month}` : month}/${year}`;
};

export default function Ledger() {
    const { token } = useAuth();

    const [state] = useContext(StoreContext);

    const [downloadModalOpen, setDownloadModalOpen] = useState(false);

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [downloading, setDownloading] = useState(false);

    const [error, setError] = useState('');

    const [downloadData, setDownloadData] = useState(null);

    const handleDownload = async e => {
        e.preventDefault();
        try {
            setDownloading(true);

            const fromDateObj = new Date(fromDate);
            const toDateObj = new Date(toDate);
            
            const res = await fetch(`${BASE_URL}/taxes/get-itc-chash-ledgers?gstin=${state.gst.gstin}&from=${formatDateForApi(fromDateObj)}&to=${formatDateForApi(toDateObj)}`, {
                headers: new Headers({
                    'Authorization': `Bearer ${token}`,
                })
            });

            if(!res.ok) {
                throw new Error('Could not download data.');
            }

            const data = await res.json();

            console.log(data);
            setDownloadData(data);

            window.print();
        } catch(err) {
            console.error(err);
            setError(err.message);
        } finally {
            setDownloading(false);
        }
    };

    return (
        <>
            <div className="container">
                <Sidebar />
                <div className="main">
                    <Topbar />
                    <div className="inner-container">
                        {
                            error ? <ErrorMessage message={error} /> : null
                        }
                        <div className="flex jc-end ai-center flex-wrap g-1rem">
                            <div className="flex g-1rem flex-wrap">
                                <button className="button is-primary is-small has-icon">
                                    <SearchIcon />
                                    Get Ledger From GSTIN
                                </button>
                                <button className="button is-primary is-small has-icon" onClick={() => setDownloadModalOpen(true)}>
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
                <Modal open={downloadModalOpen} setOpen={setDownloadModalOpen}>
                    <form onSubmit={handleDownload}>
                        <div className="flex dir-col g-1rem p-2rem">
                            <div className="field">
                                <label htmlFor="from" className="label">From</label>
                                <input
                                    type="date" 
                                    name="from" 
                                    className="input"
                                    value={fromDate} 
                                    onChange={e => setFromDate(e.target.value)} 
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="to" className="label">To</label>
                                <input
                                    type="date" 
                                    className="input"
                                    name="to" 
                                    value={toDate} 
                                    onChange={e => setToDate(e.target.value)} 
                                />
                            </div>
                            <button disabled={downloading} className="button is-primary has-icon">
                                {
                                    downloading
                                        ? (
                                            <span className="spinner small"></span>
                                        )
                                        : (
                                            <>
                                                <DownloadIcon />
                                                Download
                                            </>
                                        )
                                }
                            </button>
                        </div>
                    </form>
                </Modal>
            </div>
            <div id="section-to-print">
                ITSAWORKINGGGGG
            </div>
        </>
    )
}