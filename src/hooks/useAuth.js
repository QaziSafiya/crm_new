import { useContext } from "react";
import { StoreContext } from "../store/store-context.js";

export default function useAuth() {
    const [state] = useContext(StoreContext);
    
    return state.auth;
}