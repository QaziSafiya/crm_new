import { useEffect, useState } from "react";
import { BASE_URL } from "../constants.js";
import useAuth from "../hooks/useAuth.js";
const ENDPOINT = `${BASE_URL}/user/get-all-users`;

export default function useUsers(pageNo) {
    const { token } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState();

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${ENDPOINT}?page=${pageNo}`,{
                headers: new Headers({
                    'Authorization': `Basic ${token}`,
                })
            });

            if (!response.ok) {
                throw new Error(
                  "Unauthorized Access. You must be an admin to perform this operation."
                );
            }
            
            const data = await response.json();
          
            setUsers(data);
           
            setCurrentPage(data?.page ? data.page : pageNo);
            setTotalPages(data?.page ? data.totalPage : 1);
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