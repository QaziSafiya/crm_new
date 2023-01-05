import { useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";

export default function UpdateHomepage() {
    const [heading, setHeading] = useState('');
    const [subHeading, setSubHeading] = useState('');

    const [error, setError] = useState('');
    const [updating, setUpdating] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        try {
            setUpdating(true);
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="inner-container">
                <Topbar />
                <h5 className="title">Homepage</h5>
                <div className="section">
                    <form onSubmit={handleSubmit} className="flex dir-col g-1rem">
                        {
                            error
                                ? error
                                : null
                        }
                        <div className="field">
                            <label htmlFor="heading" className="label">Heading</label>
                            <input 
                                type="text" 
                                value={heading}
                                onChange={e => setHeading(e.target.value)}
                                name="heading" 
                                id="heading" 
                                className="input"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="heading" className="label">Sub-Heading</label>
                            <input 
                                type="text" 
                                value={subHeading}
                                onChange={e => setSubHeading(e.target.value)}
                                name="sub-heading" 
                                id="sub-heading" 
                                className="input"
                            />
                        </div>
                        <button className="button is-primary">
                            {
                                updating
                                    ? <span className="spinner small"></span>
                                    : 'Update'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}