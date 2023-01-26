import { useRef } from "react";

export default function Modal({ open, setOpen, onClose, children }) {
    const boxRef = useRef();

    const handleClick = e => {
        if(boxRef.current && boxRef.current.contains(e.target)) {
            return;
        }

        setOpen(false);
        onClose && onClose();
    };

    return (
        <div onClick={handleClick} className={`modal-overlay${open ? ' open' : ''}`}>
            <div ref={boxRef} className="modal">
                {children}
            </div>
        </div>
    )
}