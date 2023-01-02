import { useRef, useState } from "react"
import ArrowDownIcon from "./icons/ArrowDownIcon.jsx";
import ArrowUpIcon from "./icons/ArrowUpIcon.jsx";

export default function Menu({ title, icon, children }) {
    const [open, setOpen] = useState(false);

    const containerRef = useRef();

    return (
        <>
            <div className="menu">
                <button onClick={() => setOpen(!open)} className="button menu-trigger">
                    <div className="inline-flex g-2rem ai-center">
                        {icon}
                        {title}
                    </div>
                    {
                        open
                            ? <ArrowUpIcon />
                            : <ArrowDownIcon />
                    }
                </button>
                <div
                    ref={containerRef}
                    className={`menu-items${open ? ' visible' : ''}`}
                    style={open ? { height: `${containerRef.current.scrollHeight}px` } : { height: '0px' }}
                >
                    {children}
                </div>
            </div>
        </>
    )
}