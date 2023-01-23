import { NavLink, Outlet, useParams } from "react-router-dom";
import CloseCircleIcon from "../../components/icons/CloseCircleIcon.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import useCustomer from "../../hooks/useCustomer.js";

export default function CustomerLayout() {
    const { id } = useParams();
    const { customer, loading, error } = useCustomer(id);

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    {
                        loading
                            ? (
                                <div className="flex jc-center ai-center h-100pc">
                                    <span className="spinner small"></span>
                                </div>
                            )
                            : error
                                ? (
                                    <div className="error-message">
                                        <CloseCircleIcon />
                                        {error}
                                    </div>
                                )
                                : (
                                    <>
                                        <h6 className="text-secondary">{customer?.fullName}</h6>
                                        <div className="section">
                                            <div className="tabs">
                                                <NavLink end to={`/customer/${id}`} className="tab">Personal Details</NavLink> 
                                                <NavLink end to={`company`} className="tab">Company Details</NavLink>
                                                <NavLink end to={`bank`} className="tab">Bank Details</NavLink> 
                                            </div>
                                            <Outlet />
                                        </div>
                                    </>
                                )
                    }
                </div>
            </div>
        </div>
    )
}