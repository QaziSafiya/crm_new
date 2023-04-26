import { useRef, useState } from "react"
import ArrowDownIcon from "./icons/ArrowDownIcon.jsx";
import ArrowUpIcon from "./icons/ArrowUpIcon.jsx";

export default function Menu({ title, icon, children, upcoming = false}) {
    const [open, setOpen] = useState(false);

    const containerRef = useRef();

    return (
        <>
            <div className="menu">
                <button onClick={() => setOpen(!open)} className="button menu-trigger" disabled={upcoming}>
                    <div className="inline-flex g-2rem ai-center">
                        {icon}
                        <div className="inline-flex g-0_5rem jc-center ai-center">
                            {title}
                            {upcoming ? (
                                <span className="upcoming">upcoming</span>
                            ) : null}
                        </div>
                    </div>
                    {
                        upcoming
                            ? null
                            : open
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