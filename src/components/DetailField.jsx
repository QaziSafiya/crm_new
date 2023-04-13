import { useId } from "react";
import { useEffect, useMemo, useState } from "react";
import CopyIcon from "./icons/CopyIcon.jsx";
import EditIcon from "./icons/EditIcon.jsx";
import ExternalLinkIcon from "./icons/ExternalLinkIcon.jsx";
import MailIcon from "./icons/MailIcon.jsx";

export default function DetailField({ label, value, type, editable = false, handleEditedValue }) {
    const [copied, setCopied] = useState(false);
    const [editing, setEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);
    const [editedValue, setEditedValue] = useState(currentValue);

    const id = useId();

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(currentValue);
            setCopied(true);
        } catch (e) {
            console.error(e);
        }
    };

    const renderValue = useMemo(() => {
        switch(type) {
            case "email":
                return (
                    <a href={`mailto://${currentValue}`} className="flex ai-center g-0_5rem">
                        {value}
                        <MailIcon width={16} height={16} />
                    </a>
                );
            case "phone":
                return <a href={`tel://${currentValue}`}>{currentValue}</a>;
            case "link":
                return (
                    <a href={currentValue} target="_blank" className="flex ai-center g-0_5rem">
                        {currentValue}
                        <ExternalLinkIcon width={16} height={16} />
                    </a>
                );
            default:
                return currentValue;
        }
    }, [currentValue, type]);

    useEffect(() => {
        if(!copied) {
            return;
        }

        let timeout = setTimeout(() => setCopied(false), 2000);

        return () => clearTimeout(timeout);
    }, [copied]);

    const handleEditCancel = () => {
        setEditing(false);
        setEditedValue(currentValue);
    };

    const handleEditSubmit = () => {
        handleEditedValue && handleEditedValue(editedValue);
        setCurrentValue(editedValue);
        setEditing(false);
    };

    return (
        <div className="flex jc-between">
            {
                editing
                    ? (
                        <div className="field">
                            <label htmlFor={id} className="label">{label}</label>
                            <input type="text" className="input is-small" id={id} value={editedValue} onChange={e => setEditedValue(e.target.value)} />
                            <div className="flex g-1rem">
                                <button onClick={handleEditSubmit} className="button is-primary is-small">Update</button>
                                <button onClick={handleEditCancel} className="button is-danger is-small">Cancel</button>
                            </div>
                        </div>
                    )
                    : (
                        <>
                            <div className="flex dir-col g-0_5rem">
                                <strong className="text-label">{label}</strong>
                                {renderValue}
                            </div>
                            <div className="flex ai-center g-0_5rem">
                                {
                                    editable ? (
                                        <button onClick={() => setEditing(true)} className="button icon-button secondary-icon">
                                            <EditIcon />
                                        </button>
                                    ) : null
                                }
                                {
                                    copied
                                        ? <span className="inline-flex text-secondary text-small ai-center">Copied!</span>
                                        : (
                                            <button onClick={copyToClipboard} className="button icon-button secondary-icon">
                                                <CopyIcon />
                                            </button>
                                        )
                                }
                            </div>
                        </>
                    )
            }
        </div>
    )
}