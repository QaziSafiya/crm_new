import { useContext } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import { SET_THEME } from "../../store/actions.js";
import { StoreContext } from "../../store/store-context.js";

export default function ChangeTheme() {
    const [state, dispatch] = useContext(StoreContext)

    const handleChange = e => {
        const theme = e.target.value;
        dispatch({
            type: SET_THEME,
            payload: theme
        });
        localStorage.setItem('theme', theme);
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="inner-container">
                <Topbar />
                <h6 className="text-secondary">Change Theme</h6>
                <div className="section">
                    <div className="field">
                        <label htmlFor="theme" className="label">Theme</label>
                        <select onChange={handleChange} value={state.theme} className="select" name="theme" id="theme">
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}