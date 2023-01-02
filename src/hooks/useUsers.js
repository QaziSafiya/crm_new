import { useEffect, useState } from "react";
import { BASE_URL } from "../constants.js";

const ENDPOINT = `${BASE_URL}/users/get-all-user`;

export default function useUsers(pageNo) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(pageNo);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${ENDPOINT}?page=${pageNo}`);
            const { totalPages, data, currentPage } = await response.json();

            setUsers(data);
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
        fetchUsers();
    }, [pageNo]);

    return { users, loading, error, currentPage, totalPages };
}