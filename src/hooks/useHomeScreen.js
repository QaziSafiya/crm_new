import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../constants.js";

export default function useHomescreen() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const fetchHomescreen = async () => {
        try {
            const res = await fetch(`${BASE_URL}/cms/getHomeScreen`);
            const { status, data } = await res.json();

            if(status !== 'success') {
                throw new Error('Could not fetch homescreen');
            }
            
            setData(data);
            console.log(data)
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHomescreen();
    }, []);

    return [data, loading, error];
}