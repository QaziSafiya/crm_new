import { Link } from "react-router-dom";
import ViewIcon from "../components/icons/ViewIcon.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import { payments } from "../hooks/purchases.js";
import { dateFormatter } from "../lib/formatter.js";

function PaymentItem({ data, i }) {

    return (
        <tr>
            <td>{i}</td>
            <td>{data.id}</td>
            <td>{data.upi_id}</td>
            <td>{data.seller_name}</td>
            <td>{data.purchaser_name}</td>
            <td>{dateFormatter.format(data.date)}</td>
            <td>
                <Link to={`/payment/${data.id}`} className="button has-icon is-small reveal-button">
                    <ViewIcon />
                    View
                </Link>
            </td>
        </tr>
    )
}

export default function Payments() {
    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Payments</h6>
                    <div className="section p-0">
                        <div className="scrollable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>S. No.</th>
                                        <th>Transaction ID</th>
                                        <th>UPI ID</th>
                                        <th>Seller Name</th>
                                        <th>Purchaser Name</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        payments.map((payment, i) => (
                                            <PaymentItem key={payment.id} i={i + 1} data={payment} />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}