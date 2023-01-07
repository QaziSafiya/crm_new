import { useState } from "react"
import { BASE_URL } from "../constants.js";
import useAuth from "../hooks/useAuth.js";
import EditIcon from "./icons/EditIcon.jsx";

export default function EditableItem({ name, value, param, endpoint }) {
    const { token } = useAuth();

    const [currentValue, setCurrentValue] = useState(value);
    const [editing, setEditing] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState('');

    const handleUpdate = async () => {
        try {
            const { status } = await fetch(
                `${BASE_URL}/${endpoint}`,
                {
                    method: 'POST',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }),
                    body: JSON.stringify({
                        [param]: currentValue
                    })
                }
            );
            
            console.log(status);
            setEditing(false);
        } catch(e) {
            console.error(e);
            setError(`Could not update ${name}`);
        } finally {
            setUpdating(false);
        }
    };

    const cancelEdit = () => {
        setEditing(false);
        setError('');
    };

    return (
        !editing
            ? (
                <div className="flex jc-between ai-center g-1rem">
                    <span className="text-large text-secondary">{name}</span>
                    {value}
                    <button
                        className="button has-icon is-outlined is-small" 
                        onClick={() => setEditing(editing => !editing)}
                    >
                        <EditIcon />
                        Edit
                    </button>
                </div>
            )
            : (
                <div className="flex dir-col jc-between ai-top g-0_5rem">
                    <span className="text-large">{name}</span>
                    <input
                        type="text"
                        className="input" 
                        value={currentValue}
                        onChange={e => setCurrentValue(e.target.value)}
                    />
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