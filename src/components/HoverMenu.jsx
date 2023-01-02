import { useEffect, useRef, useState } from "react"

export default function HoverMenu({ icon, tooltip, children }) {
    const [open, setOpen] = useState(false);

    const menuRef = useRef();

    const handleClose = e => {
        if(menuRef.current && menuRef.current.contains(e.target)) {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClose);

        return () => document.removeEventListener('mousedown', handleClose);
    }, [menuRef]);

    return (
        <div className="hover-menu-wrapper">
            {
                !open
                    ? (
                        <button
                            onClick={() => setOpen(true)}
                            title={tooltip} 
                            className="button icon-button secondary-icon"
                        >
                            {icon}
                        </button>
                    )
                    : (
                        <div ref={menuRef} className='hover-menu'>
                            {children}
                        </div>
                    )
            }
        </div>
    )
}