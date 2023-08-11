import { useState } from "react"
import { BASE_URL } from "../constants.js";
import useAuth from "../hooks/useAuth.js";
import EditIcon from "./icons/EditIcon.jsx";

export default function EditableItem({ name, value, param, endpoint, setUpper }) {
    const { token } = useAuth();

    const [editedValue, setEditedValue] = useState(value);
    const [editing, setEditing] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');

    const handleUpdate = async () => {
        try {
            setUpdating(true);
            const response = await fetch(
                `${BASE_URL}/${endpoint}`,
                {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3ROYW1lIjoiSGFyc2giLCJsYXN0TmFtZSI6IlNpbmdoIiwiYWRkcmVzcyI6bnVsbCwiYWFkaGFhciI6bnVsbCwicGFuIjpudWxsLCJlbWFpbCI6ImhhcnNoc2luZ2guanNAZ21haWwuY29tIiwicGhvbmUiOiI3NjUyMDM1MTUyIiwidXNlclR5cGUiOiJhZG1pbiIsInZlcmlmaWVkIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDIzLTA3LTEzVDEzOjQzOjExLjE1N1oiLCJpYXQiOjE2ODk0MDM1NjQsImV4cCI6MTcyMDk2MTE2NCwiaXNzIjoiaVRheEVhc3kifQ.Ol-SkcIFpxrLKDjuF3jJqJw6S18zIrcp4ftKDQtq0VM`
                    }),
                    body: JSON.stringify({
                        [param]: editedValue
                    })
                }
            );

            if(!response.ok) {
                throw new Error(`Could not update ${name}`)
            }

            const { data: { upper } } = await response.json();
            
            setUpper(upper);
            setEditing(false);
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setUpdating(false);
        }
    };

    const cancelEdit = () => {
        setEditing(false);
        setError('');
        setEditedValue(value);
    };

    return (
        !editing
            ? (
                <div className="flex dir-col jc-between ai-top g-0_5rem">
                    <span className="text-large text-secondary">{name}</span>
                    <div className="flex jc-between ai-center g-1rem">
                        {value}
                        <button
                            className="button has-icon is-outlined is-small" 
                            onClick={() => setEditing(editing => !editing)}
                        >
                            <EditIcon />
                            Edit
                        </button>
                    </div>
                </div>
            )
            : (
                <div className="flex dir-col jc-between ai-top g-0_5rem">
                    <span className="text-large">{name}</span>
                    <textarea
                        type="text"
                        className="textarea" 
                        value={editedValue}
                        onChange={e => setEditedValue(e.target.value)}
                    ></textarea>
                    {
                        error
                            ? <div className="error-message">{error}</div>
                            : null
                    }
                    <div className="flex g-1rem">
                        <button
                            className="button is-primary has-icon is-small" 
                            onClick={handleUpdate}
                        >
                            {
                                updating
                                    ? <span className="spinner small"></span>
                                    : 'Update'
                            }
                        </button>
                        <button onClick={cancelEdit} className="button is-danger is-small">
                            Cancel
                        </button>
                    </div>
                </div>
            )
    )
}