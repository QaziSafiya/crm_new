import Footer from "../components/Footer.jsx";
import CloseCircleIcon from "../components/icons/CloseCircleIcon.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";
import useDashboard from "../hooks/useDashboard.js";

export default function Dashboard() {
    const [data, loading, error] = useDashboard();

    return (
        <div className='container'>
           <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Dashboard</h6>
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
                                    <div className="flex g-1rem flex-wrap">
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="title">Total Users</h3>
                                            </div>
                                            <div className="card-body">
                                                <span className="text-large">{data.usersCount}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                    }
                </div>
                <Footer />
            </div>
        </div>
    )
}