import Footer from "../components/Footer.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Topbar from "../components/Topbar.jsx";

export default function Dashboard() {

    return (
        <div className='container'>
           <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Dashboard</h6>
                </div>
                <Footer />
            </div>
        </div>
    )
}