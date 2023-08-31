import { useCallback } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import ErrorMessage from "../../components/messages/ErrorMessage.jsx";
import SuccessMessage from "../../components/messages/SuccessMessage.jsx";
import Pagination from "../../components/Pagination.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import { BASE_URL } from "../../constants.js";
import useAuth from "../../hooks/useAuth.js";
import { currencyFormatter, dateFormatter } from "../../lib/formatter.js";

export default function Payments() {
    const { token } = useAuth();

    const [search, setSearch] = useSearchParams();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const page = parseInt(search.get('page')) || 0;

    const fetchPayments = useCallback(async () => {
        const res = await fetch(`${BASE_URL}/payment/user/all?pageNo=${page}`, {
            headers: new Headers({
                'Authorization': `Basic ${token}`,
            })
        });
    
        return res.json();
    }, [page]);    

    const { data, isLoading, error: fetchError } = useQuery(['payments', page], fetchPayments);

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Payments</h6>
                    {
                        error ? <ErrorMessage message={error} /> : null
                    }
                    {
                        success ? <SuccessMessage message={success} /> : null
                    }
                    {
                        isLoading
                            ? (
                                <div className="flex jc-center ai-center p-1rem">
                                    <span className="spinner small"></span>
                                </div>
                            )
                            : fetchError
                                ? <ErrorMessage message='Could not load services.' />
                                : (
                                    <>
                                        {
                                            !data?.transactions?.length ? (
                                                <div className="section ai-center jc-center">
                                                    <h6>No Payments</h6>
                                                    <span className="text-secondary">
                                                        You have not made any payments yet.
                                                    </span>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="section p-0">
                                                        <div className="scrollable">
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Order ID</th>
                                                                        <th>Date</th>
                                                                        <th>Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {data.transactions.map(payment => (
                                                                        <tr key={payment.razorpay_order_id}>
                                                                            <td>{payment.razorpay_order_id}</td>
                                                                            <td>{dateFormatter.format(new Date(payment.createdAt))}</td>
                                                                            <td>{payment.status}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                    <Pagination totalPages={data.total_pages} currentPage={page} />
                                                </>
                                            )
                                        }

                                    </>
                                )
                    }
                </div>
            </div>
        </div>
    )
}