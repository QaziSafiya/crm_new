import { useState } from "react";
import AddCircleIcon from "../../components/icons/AddCircleIcon.jsx";
import DeleteIcon from "../../components/icons/DeleteIcon.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";

export default function UpdateService() {
    const [docs, setDocs] = useState([]);

    const handleDocNameUpdate = (id, name) => {
        setDocs(docs.map((doc, idx) => {
            if(idx !== id) {
                return doc;
            }

            return { ...doc, name };
        }));
    };

    const handleDocTypeUpdate = (id, type) => {
        setDocs(docs.map((doc, idx) => {
            if(idx !== id) {
                return doc;
            }

            return { ...doc, type };
        }));
    };

    const handleDocDelete = id => {
        setDocs(docs.filter((_, idx) => idx !== id));
    };

    const handleAddDoc = () => {
        const newDoc = {
            name: '',
            type: 'file',
        };
        
        setDocs([
            ...docs,
            newDoc
        ]);
    };

    return (
        <div className='container'>
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Update Service</h6>
                    <div className="section">
                        <form className="flex dir-col g-1rem">
                            <div className="flex dir-col g-1rem">
                                <h6 className="text-primary">Service Details</h6>
                                <div className="field">
                                    <label htmlFor="serviceName" className="label text-primary">Service Name</label>
                                    <input type="text" className="input" id="serviceName" placeholder="Name of service" />
                                </div>
                                <div className="flex ai-center g-1rem">
                                    <div className="field flex-1">
                                        <label htmlFor="serviceCharge" className="label text-primary">Service Charge</label>
                                        <input type="text" className="input" id="serviceCharge" placeholder="0.0" />
                                    </div>
                                    <div className="field flex-1">
                                        <label htmlFor="gst" className="label text-primary">GST</label>
                                        <input type="text" className="input" id="gst" placeholder="0" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="serviceBanner" className="label text-primary">Banner URL</label>
                                    <input type="text" className="input" id="serviceBanner" placeholder="http://example.com/banner.jpg" />
                                </div>
                                <div className="field">
                                    <label htmlFor="Description" className="label text-primary">Description</label>
                                    <textarea className="textarea" id="Description" placeholder="Describe the service"></textarea>
                                </div>
                            </div>
                            <div className="flex dir-col g-1rem">
                                <h6 className="text-primary">Required Documents</h6>
                                {
                                    docs.length > 0
                                        ? (
                                            <div className="flex dir-col g-1rem">
                                                {
                                                    docs.map((doc, key) => (
                                                        <div key={key} className="flex g-1rem ai-center">
                                                            <span className="inline-flex jc-center ai-center text-large">{key + 1}</span>
                                                            <input value={doc.name} onChange={e => handleDocNameUpdate(key, e.target.value)} type="text" className="input is-small" placeholder="Document Name" />
                                                            <select value={doc.type} onChange={e => handleDocTypeUpdate(key, e.target.value)} name="docType" id="docType" className="select">
                                                                <option value="file">File</option>
                                                                <option value="text">Text</option>
                                                            </select>
                                                            <button type="button" onClick={() => handleDocDelete(key)} className="button icon-button">
                                                                <DeleteIcon />
                                                            </button>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                        : null
                                }
                                <button type="button" onClick={handleAddDoc} className="button has-icon reveal-button is-small w-max-content">
                                    <AddCircleIcon />
                                    Add Document
                                </button>
                            </div>
                            <button className="button is-primary">Add Service</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}