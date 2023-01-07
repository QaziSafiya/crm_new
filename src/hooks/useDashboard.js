import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants.js";
import { SET_DASHBOARD_DATA } from "../store/actions.js";
import { StoreContext } from "../store/store-context.js";

export default function useDashboard() {
    const [state, dispatch] = useContext(StoreContext);
    const [data, setData] = useState(state.dashboard.data);
    const [loading, setLoading] = useState(state.dashboard.loading);
    const [error, setError] = useState('');

    const fetchDashboard = async () => {
        if(!loading) {
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/cms/get-user-count`);
            const { count } = await res.json();

            const data = {
                usersCount: count
            };

            dispatch({
                type: SET_DASHBOARD_DATA,
                payload: data
            });

            setData(data);
        } catch(e) {
            console.error(e);
            setError('Could not load dashboard data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return [data, loading, error];
}