import { Link, useSearchParams } from "react-router-dom";
import AddCircleIcon from "../../components/icons/AddCircleIcon.jsx";
import ViewIcon from "../../components/icons/ViewIcon.jsx";
import Pagination from "../../components/Pagination.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import { postDateFormatter } from "../../lib/formatter.js";

const data = {
    loans: [
        {  
            id: crypto.randomUUID(),
            type: 'Business Loan',
            amount: 10_000,
            date_applied: new Date(),
            last_update: new Date(),
            status: 'pending',
        },
        {  
            id: crypto.randomUUID(),
            type: 'Business Loan',
            amount: 10_000,
            date_applied: new Date(),
            last_update: new Date(),
            status: 'pending',
        },
        {  
            id: crypto.randomUUID(),
            type: 'Car Loan',
            amount: 10_000,
            date_applied: new Date(),
            last_update: new Date(),
            status: 'rejected',
        },
        {  
            id: crypto.randomUUID(),
            type: 'Business Loan',
            amount: 10_000,
            date_applied: new Date(),
            last_update: new Date(),
            status: 'approved',
        },
    ]
};

const badgeColors = {
    'pending': 'secondary',
    'rejected': 'danger',
    'approved': 'success',
};

export default function LoanIndex() {
    const [search, setSearch] = useSearchParams();

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <div className="flex jc-between ai-center">
                        <h6 className="text-secondary">Loan</h6>
                        <Link to="/loan/apply" className="button is-primary is-small has-icon">
                            <AddCircleIcon />
                            Apply For Loan
                        </Link>
                    </div>
                    <h6 className="m-0">Applied Loans</h6>
                    <div className="section p-0">
                        <div className="scrollable">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Loan Type</th>
                                        <th>Applied on</th>
                                        <th>Status</th>
                                        <th>Last Update</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    data.loans.map(loan => (
                                            <tr key={loan.id}>
                                                <td>
                                                    <h6 className="title">{loan.type}</h6>
                                                </td>
                                                <td>
                                                    {
                                                        postDateFormatter.format(loan.date_applied)
                                                    }
                                                </td>
                                                <td>
                                                    <span className={`badge ${badgeColors[loan.status]}`}>
                                                        {loan.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    {
                                                        postDateFormatter.format(loan.last_update)
                                                    }
                                                </td>
                                                <td>
                                                    <Link to={`/loan/l/${loan.id}`} className="button has-icon reveal-button is-small w-max-content">
                                                        <ViewIcon />
                                                        Details
                                                    </Link>
                                                </td>
                                            </tr>
                                    ))
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Pagination totalPages={1} currentPage={0} setSearch={setSearch} />
                </div>
            </div>
        </div>
    );
}