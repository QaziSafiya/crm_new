import { useCallback } from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import ViewIcon from "../../components/icons/ViewIcon.jsx";
import ErrorMessage from "../../components/messages/ErrorMessage.jsx";
import SuccessMessage from "../../components/messages/SuccessMessage.jsx";
import Pagination from "../../components/Pagination.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import { BASE_URL } from "../../constants.js";
import useAuth from "../../hooks/useAuth.js";
import { currencyFormatter, dateFormatter } from "../../lib/formatter.js";

export default function Orders() {
    const { token } = useAuth();

    const [search, setSearch] = useSearchParams();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const page = parseInt(search.get('page')) || 0;

    const fetchOrders = useCallback(async () => {
        const res = await fetch(`${BASE_URL}/order/user/all?pageNo=${page}`, {
            headers: new Headers({
                'Authorization': `Basic ${token}`,
            })
        });
    
        return res.json();
    }, [page]);    

    const { data, isLoading, error: fetchError } = useQuery(['orders', page], fetchOrders);

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Orders</h6>
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
                                            !data.orders.length
                                                ? (
                                                    <div className="section ai-center jc-center">
                                                        <h6>No Orders</h6>
                                                        <span className="text-secondary">
                                                            You have not placed any orders with us yet.
                                                        </span>
                                                        <a href="https://itaxeasy.com/register-startup" target="_blank" className="button is-primary is-small text-large">Browse Services</a>
                                                    </div>
                                                )
                                                : (
                                                    <>
                                                    <div className="section p-0">
                                                        <div className="scrollable">
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Order ID</th>
                                                                        <th>₹ Price</th>
                                                                        <th>Date</th>
                                                                        <th>Status</th>
                                                                        <th>Last Update</th>
                                                                        <th>Details</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        data.orders.map(order => {
                                                                            return (
                                                                                <tr key={order.id}>
                                                                                    <td>{order.id}</td>
                                                                                    <td>{currencyFormatter.format(order.price)}</td>
                                                                                    <td>{dateFormatter.format(new Date(order.createdAt))}</td>
                                                                                    <td>{order.status}</td>
                                                                                    <td>{dateFormatter.format(new Date(order.updatedAt))}</td>
                                                                                    <td>
                                                                                    <Link to={`/order/${order.id}`} className="button has-icon reveal-button is-small w-max-content">
                                                                                        <ViewIcon />
                                                                                        Details
                                                                                    </Link>
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
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