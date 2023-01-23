import { Link, useParams, useSearchParams } from "react-router-dom";
import EditIcon from "../../components/icons/EditIcon.jsx";
import ViewIcon from "../../components/icons/ViewIcon.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import useCustomers from "../../hooks/useCustomers.js";

export default function Customers() {
    const [{ pageNo = 0 }] = useSearchParams();
    const { customers, loading, error, currentPage, totalPages } = useCustomers(pageNo);

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Customers</h6>
                    {
                        loading
                            ? (
                                <div className="flex jc-center ai-center">
                                    <span className="spinner medium"></span>
                                </div>
                            )
                            : 
                                error 
                                    ? (
                                        <div className="error-message">
                                            <CloseCircleIcon />
                                            {error}
                                        </div>
                                    )
                                    : (
                                        <>
                                            <table className="users-table">
                                                <thead>
                                                    <tr>
                                                        <th>First Name</th>
                                                        <th>Last Name</th>
                                                        <th>Email</th>
                                                        <th>Mobile No.</th>
                                                        <th>Pincode</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        customers.map(customer => {
                                                            return (
                                                                <tr key={customer.id}>
                                                                    <td>{customer.fname}</td>
                                                                    <td>{customer.lname}</td>
                                                                    <td>{customer.email}</td>
                                                                    <td>{customer.mobile}</td>
                                                                    <td>{customer.pincode}</td>
                                                                    <td>
                                                                        <div className="flex g-1rem">
                                                                            <Link to={`/customers`} className="button has-icon is-primary is-small">
                                                                                <ViewIcon />
                                                                                Details
                                                                            </Link>
                                                                            <Link to={`/update-customer/${customer.id}`} className="button has-icon is-secondary is-small">
                                                                                <EditIcon />
                                                                                Update
                                                                            </Link>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                            <div className="pagination">
                                                {
                                                    currentPage > 0
                                                        ? (<Link className="text-bold" to={`?page=${currentPage - 1}`}>Prev</Link>)
                                                        : (<span className="text-secondary text-bold">Prev</span>)
                                                }
                                                <span className="text-secondary">
                                                    ({currentPage + 1} / {totalPages})
                                                </span>
                                                {
                                                    (currentPage + 1) < totalPages
                                                        ? (<Link className="text-bold" to={`?page=${currentPage + 1}`}>Next</Link>)
                                                        : (<span className="text-secondary text-bold">Next</span>)
                                                }
                                            </div>
                                        </>
                                    )
                    }
                </div>
            </div>
        </div>
    )
}