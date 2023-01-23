import { useEffect, useState } from "react";
import { BASE_URL } from "../constants.js";
import useAuth from '../hooks/useAuth.js';

const ENDPOINT = `${BASE_URL}/cms/get-customer`;

export default function useUsers(pageNo) {
    const { token } = useAuth();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [customers, setCustomers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(pageNo);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${ENDPOINT}?page=${pageNo}`,
                {
                    headers: new Headers({
                        "Authorization": `Bearer ${token}`
                    })
                }
            );
            const { totalPages, data, currentPage } = await response.json();

            setCustomers(data);
            setTotalPages(totalPages);
            setCurrentPage(currentPage);
        } catch(e) {
            console.log(e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [pageNo]);

    return { customers, loading, error, currentPage, totalPages };
}