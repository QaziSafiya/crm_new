import CloseCircleIcon from "../../components/icons/CloseCircleIcon.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import useHomescreen from "../../hooks/useHomeScreen.js";
import UpdateNavCards from "./sections/UpdateNavCards.jsx";
import UpdateUpper from "./sections/UpdateUpper.jsx";

export default function UpdateHomepage() {
    const [data, loading, error] = useHomescreen();

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Homepage</h6>
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
                                    <div className="flex dir-col g-1rem">
                                        <UpdateUpper data={data?.upper} />
                                        <UpdateNavCards data={data?.navcards} />
                                    </div>
                                )
                    }
                </div>
            </div>
        </div>
    )
}