import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import DetailField from "../../components/DetailField.jsx";
import ErrorMessage from "../../components/messages/ErrorMessage.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import TabButton from "../../components/TabButton.jsx";
import Topbar from "../../components/Topbar.jsx";
import { BASE_URL } from "../../constants.js";
import useAuth from "../../hooks/useAuth.js";
import { currencyFormatter, dateFormatter } from "../../lib/formatter.js";

export default function OrderDetails() {
    const { token } = useAuth();

    const { id } = useParams();

    const [tab, setTab] = useState('Details');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [order, setOrder] = useState(null);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/order/${id}`, {
                headers: new Headers({
                    'Authorization': `Basic ${token}`,
                }),
            });
            
            if(!res.ok) {
                throw new Error('Could not load order details');
            }

            const orderDetails = await res.json();

            console.log(orderDetails)

            setOrder(orderDetails);
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    const tabs = useMemo(() => {
        if(!order) {
            return;
        }

        return {
            'Details': (
                <>
                    <DetailField label="Order ID" value={order.id} />
                    <DetailField label="Order Date" value={dateFormatter.format(new Date(order.createdAt))} />
                    <DetailField label="Last Update" value={dateFormatter.format(new Date(order.updatedAt))} />
                    <DetailField label="Status" value={order.status} />
                    <DetailField label="Price" value={currencyFormatter.format(order.price)} />
                    <DetailField label="GST" value={order.gst} />
                </>
            ),
            'Documents': (
                <>Documents</>
            ),
    
        }
    }, [order]);


    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    {
                        loading ? (
                            <div className="flex jc-center ai-center p-1rem">
                                <span className="spinner small"></span>
                            </div>
                        )
                        : error
                            ? <ErrorMessage message='Could not load order.' />
                            : (
                                <>
                                    <h6 className="text-secondary">Details of Order</h6>
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
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    );
}