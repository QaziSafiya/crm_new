import { useContext, useEffect } from "react";
import { StoreContext } from "../store/store-context.js";

export default function useTheme() {
    const [state, dispatch] = useContext(StoreContext);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', state.theme);
    }, [state.theme]);

    useEffect(() => {
        dispatch({
            
        })
    }, []);
}