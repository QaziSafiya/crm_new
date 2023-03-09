import { useEffect, useRef } from 'react';
import useAuth from '../hooks/useAuth.js';

const INVOICE_URL = 'https://invoice.itaxeasy.com';

export default function TELink({ path = '/', children, className }) {
    const { currentUser, token } = useAuth();

    const childWindowRef = useRef();

    const handleClick = (e) => {
        e.preventDefault();

        childWindowRef.current = window.open(INVOICE_URL, '_blank');
    };

    const handleMessage = (e) => {
        if (e.origin !== INVOICE_URL) {
            return;
        }

        if (childWindowRef.current) {
            childWindowRef.current.postMessage(
                { data: currentUser, token, redirect: path },
                INVOICE_URL
            );

            console.log('SENT TOKEN');
        }
    };

    useEffect(() => {
        window.addEventListener('message', handleMessage);

        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <a
            href="#"
            onClick={handleClick}
            className={className}
            // className="py-3 px-1 w-56 font-bold text-slate-700 hover:text-blue-600 flex items-center justify-between"
        >
            {children}
        </a>
    );
}
