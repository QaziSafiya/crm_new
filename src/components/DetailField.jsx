import { useEffect, useMemo, useState } from "react";
import CopyIcon from "./icons/CopyIcon.jsx";
import ExternalLinkIcon from "./icons/ExternalLinkIcon.jsx";
import MailIcon from "./icons/MailIcon.jsx";

export default function DetailField({ label, value, type }) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
        } catch (e) {
            console.error(e);
        }
    };

    const renderValue = useMemo(() => {
        switch(type) {
            case "email":
                return (
                    <a href={`mailto://${value}`} className="flex ai-center g-0_5rem">
                        {value}
                        <MailIcon width={16} height={16} />
                    </a>
                );
            case "phone":
                return <a href={`tel://${value}`}>{value}</a>;
            case "link":
                return (
                    <a href={value} target="_blank" className="flex ai-center g-0_5rem">
                        {value}
                        <ExternalLinkIcon width={16} height={16} />
                    </a>
                );
            default:
                return value;
        }
    }, [value, type]);

    useEffect(() => {
        if(!copied) {
            return;
        }

        let timeout = setTimeout(() => setCopied(false), 2000);

        return () => clearTimeout(timeout);
    }, [copied]);

    return (
        <div className="flex jc-between">
            <div className="flex dir-col g-0_5rem">
                <strong className="text-label">{label}</strong>
                {renderValue}
            </div>
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
    )
}