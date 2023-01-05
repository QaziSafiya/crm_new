import { useContext, useEffect } from "react";
import { SET_THEME } from "../store/actions.js";
import { StoreContext } from "../store/store-context.js";

export default function useTheme() {
    const [state, dispatch] = useContext(StoreContext);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', state.theme);
    }, [state.theme]);

    useEffect(() => {
        const theme = localStorage.getItem('theme');

        dispatch({
            type: SET_THEME,
            payload: theme
        })
    }, []);
}