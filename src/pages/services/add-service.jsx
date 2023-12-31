import { useState } from "react";
import AddCircleIcon from "../../components/icons/AddCircleIcon.jsx";
import DeleteIcon from "../../components/icons/DeleteIcon.jsx";
import ErrorMessage from "../../components/messages/ErrorMessage.jsx";
import SuccessMessage from "../../components/messages/SuccessMessage.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import { BASE_URL } from "../../constants.js";
import useAuth from "../../hooks/useAuth.js";

export default function AddService() {
    const { token } = useAuth();
        
    const [service, setService] = useState({
        serviceName: '',
        serviceType: '',
        description: '',
        price: '',
        gst: '',
        imgUrl: '',
        documents: []
    });

    const [adding, setAdding] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleDocChange = (e, id) => {
        const updatedDocuments = service.documents.map((doc, idx) => {
            if (idx !== id) {
                return doc; // If not the targeted document, keep it unchanged
            }
    
            // If the idx matches the targeted document, update the specific field
            return {
                ...doc, // Copy the existing document object
                [e.target.name]: e.target.value // Update the specific field
            };
        });
    
        setService({
            ...service,
            documents: updatedDocuments
        });
    };
    

    const handleChange = e => {
        setService({
            ...service,
            [e.target.name]: e.target.value
        });
    };

    const handleDocDelete = id => {
        setService({
            ...service,
            documents: service.documents.filter((_, idx) => idx !== id)
        });
    };

    const handleAddDoc = () => {
        const newDoc = {
            title: '',       // Fixed: Change 'name' to 'title'
            shortName: '',
            type: 'file',
            numInputs: '',
        };

        setService({
            ...service,
            documents: [
                ...service.documents,
                newDoc
            ]
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        // console.log(service);
        try {
            setAdding(true);
            setError('');
    
            const res = await fetch(`${BASE_URL}/services`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Basic eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3ROYW1lIjoiaVRheEVhc3kiLCJsYXN0TmFtZSI6IkFkbWluIiwiYWRkcmVzcyI6bnVsbCwiYWFkaGFhciI6bnVsbCwicGFuIjpudWxsLCJlbWFpbCI6ImFkbWluQGl0YXhlYXN5LmNvbSIsInBob25lIjpudWxsLCJ1c2VyVHlwZSI6ImFkbWluIiwidmVyaWZpZWQiOnRydWUsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMjdUMDk6MTc6MzEuODA0WiIsImlhdCI6MTY4Nzg1NzY5NywiZXhwIjoxNzE5NDE1Mjk3LCJpc3MiOiJpVGF4RWFzeSJ9.4u41-IhAQzpZpkirYY6dBYlznbUuc8ScUqak0nXH7n0`,
                    'Content-Type': 'application/json',
                }),
                body: JSON.stringify({
                    ...service, // Spread the service object
                }),
            });
    
            if (!res.ok) {
                throw new Error('Could not add service');
            }
    
            setSuccess('Service has been added successfully');
        } catch (e) {
            setError(e.message);
        } finally {
            setAdding(false);
        }
    };
    

    return (
        <div className='container'>
            <Sidebar />
            <div className="main">
                <Topbar />
                <div className="inner-container">
                    <h6 className="text-secondary">Add Service</h6>
                    {
                        success ? <SuccessMessage message={success} /> : null
                    }
                    {
                        error ? <ErrorMessage message={error} /> : null
                    }
                    <div className="section">
                        <form onSubmit={handleSubmit} className="flex dir-col g-1rem">
                            <div className="flex dir-col g-1rem">
                                <h6 className="text-primary">Service Details</h6>
                                <div className="flex ai-center g-1rem">
                                    <div className="field flex-1">
                                        <label htmlFor="serviceName" className="label text-primary">Service Name</label>
                                        <input name="serviceName" value={service.serviceName} onChange={handleChange} type="text" className="input is-small" id="serviceName" placeholder="Name of service" />
                                    </div>
                                    <div className="field flex-1">
                                        <label htmlFor="serviceType" className="label text-primary">Service Type</label>
                                        <input name="serviceType" value={service.serviceType} onChange={handleChange} type="text" className="input is-small" id="serviceName" placeholder="Type of service (eg. Registration)" />
                                    </div>
                                </div>
                                <div className="flex ai-center g-1rem">
                                    <div className="field flex-1">
                                        <label htmlFor="serviceCharge" className="label text-primary">Service Charge</label>
                                        <input name="price" onChange={handleChange} value={service.price} type="number" className="input is-small" id="serviceCharge" placeholder="0.0" />
                                    </div>
                                    <div className="field flex-1">
                                        <label htmlFor="gst" className="label text-primary">GST</label>
                                        <input name="gst" onChange={handleChange} value={service.gst} type="number" className="input is-small" id="gst" placeholder="0" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="serviceBanner" className="label text-primary">Banner URL</label>
                                    <input name="imgUrl" onChange={handleChange} value={service.imgUrl} type="text" className="input is-small" id="serviceBanner" placeholder="http://example.com/banner.jpg" />
                                </div>
                                <div className="field">
                                    <label htmlFor="Description" className="label text-primary">Description</label>
                                    <textarea name="description" onChange={handleChange} value={service.description} className="textarea" id="Description" placeholder="Describe the service"></textarea>
                                </div>
                            </div>
                            <div className="flex dir-col g-1rem">
                                <h6 className="text-primary">Required Documents</h6>
                                {
                                    service.documents.length > 0
                                        ? (
                                            <div className="flex dir-col g-1rem">
                                                {
                                                    service.documents.map((doc, key) => (
                                                        <div key={key} className="flex g-1rem ai-center">
                                                            <span className="inline-flex jc-center ai-center text-large">{key + 1}</span>
                                                            <input value={doc.title} name="title" onChange={e => handleDocChange(e, key)} type="text" className="input is-small" placeholder="Document Name" />
                                                            <input value={doc.shortName} name="shortName" onChange={e => handleDocChange(e, key)} type="text" className="input is-small" placeholder="Short Name" />
                                                            <select value={doc.type} name="type" onChange={e => handleDocChange(e, key)} id="docType" className="select">
                                                                <option value="file">File</option>
                                                                <option value="file-multi">File Multiple</option>
                                                                <option value="text">Text</option>
                                                                <option value="text-multi">Multiple Text</option>
                                                            </select>
                                                            {
                                                                doc.type === 'text-multi' || doc.type === 'file-multi'
                                                                    ? <input value={doc.numInputs} name="numInputs" onChange={e => handleDocChange(e, key)} type="text" className="input is-small" placeholder="Number of Inputs" />
                                                                    : null
                                                            }
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
                            <button className="button is-primary" disabled={adding}>
                                {
                                    adding
                                        ? <span className="spinner small"></span>
                                        : 'Add Service'
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}