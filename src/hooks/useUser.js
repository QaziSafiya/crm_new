import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../constants.js";
import { SET_USER_DETAILS } from "../store/actions.js";
import { StoreContext } from "../store/store-context.js";
import useAuth from "./useAuth.js";

export default function useUser(id) {
    const { token } = useAuth();
    const [state, dispatch] = useContext(StoreContext);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchUser = async () => {
        try {
            // console.log(state.user)

            if((state.user?.id === id) || !id) {
                setUser(state.user);
                setLoading(false);
                
                return;
            }
            
            const response = await fetch(
                `${BASE_URL}/user/profile/${id}`,
                {
                    method: "GET",
                    headers: new Headers({
                        "Authorization": `Bearer ${token}`
                    }),
                    redirect: "follow"
                }
            );

            const { message, data } = await response.json();
            
            const responseData = data.user;

            if(!response.ok) {
                throw new Error(message);
            }

            const user = {
                ...responseData,
                fullName: responseData.lastName ? `${responseData.firstName} ${responseData.lastName}` : responseData.firstName
            };

            setUser(user);
            dispatch({
                type: SET_USER_DETAILS,
                payload: user
            });
        } catch(e) {
            console.error(e);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [id]);

    return { user, loading, error };
}