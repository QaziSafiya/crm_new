import { useEffect, useState } from "react";

export default function useCustomer(id) {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setCustomer($customers.find(customer => customer.id === id));
        setLoading(false);
    }, [id]);

    return { customer, loading, error };
}