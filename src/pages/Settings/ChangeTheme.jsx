import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import useTheme from "../../hooks/useTheme.js";

export default function ChangeTheme() {
    const [theme, setTheme] = useTheme();

    const handleChange = e => {
        const theme = e.target.value;
        setTheme(theme);
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
                        <select onChange={handleChange} value={theme} className="select" name="theme" id="theme">
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}