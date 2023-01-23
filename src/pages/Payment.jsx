import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DetailField from "../components/DetailField.jsx";
import ViewIcon from "../components/icons/ViewIcon.jsx";
import Sidebar from "../components/Sidebar.jsx";
import TabButton from "../components/TabButton.jsx";
import Topbar from "../components/Topbar.jsx";
import { payments } from "../hooks/purchases.js";
import { dateFormatter } from "../lib/formatter.js";


export default function Payment() {
    const { id } = useParams();

    const payment = payments[id];

    const [tab, setTab] = useState('Details');

    const tabs = {
        Details: (
            <>
                <DetailField label="UPI ID" value={payment.upi_id} />
                <DetailField label="Reciept" />
                <DetailField label="Date" value={dateFormatter.format(payment.date)} />
                <div className="flex g-1rem ai-center">
                    <span className="text-label text-bold g-0_5rem">Screenshot</span>
                    <Link to="/" className="button has-icon is-small reveal-button">
                        <ViewIcon />
                        View
                    </Link>
                </div>
            </>
        ),
        Seller: (
            <>
                <DetailField label="Seller name" value={payment.seller_name} />
                <DetailField label="Bank Name" value="State Bank Of India" />
                <DetailField label="Bank IFSC Code" value="SBIN00000014" />
                <DetailField label="Bank Account no" value="30103010114643" />
            </>
        ),
        Purchaser: (
            <>
                <DetailField label="Purchaser name" value={payment.purchaser_name} />
                <DetailField label="Bank Name" value="State Bank Of India" />
                <DetailField label="Bank IFSC Code" value="SBIN00000014" />
                <DetailField label="Bank Account no" value="30103010114643" />
            </>
        )
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Payment #{payment.id}</h6>
                    <div className="section">
                        <div className="tabs">
                            {
                                Object.keys(tabs).map(_tab => {
                                    return (
                                        <TabButton tab={_tab} setTab={setTab} currentTab={tab}>
                                            {_tab}
                                        </TabButton>
                                    )
                                })
                            }
                        </div>
                        {tabs[tab]}
                    </div>
                </div>
            </div>
        </div>
    )
}